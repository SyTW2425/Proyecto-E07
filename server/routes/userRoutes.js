const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const { loginLimiter, validateLogin } = require('../middleware/loginMiddlewares');

// Ruta para el login de usuarios
router.post('/login', [
  loginLimiter,
  ...validateLogin
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    // Buscar el usuario por su username
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, usuario });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

// Función para generar un username único
async function generarUsername(nombre, apellidos) {
  const iniciales = `${nombre.charAt(0).toLowerCase()}${apellidos.replace(/\s+/g, '').slice(0, 2).toLowerCase()}`;
  const generarNumeros = () => Math.floor(1000 + Math.random() * 9000);

  let username;
  let usernameExiste = true;

  while (usernameExiste) {
    const numeros = generarNumeros();
    username = `${iniciales}${numeros}`;

    const usuarioExistente = await Usuario.findOne({ username });
    usernameExiste = !!usuarioExistente; // Será `true` si el usuario ya existe, `false` si es único
  }

  return username;
}

// Ruta para obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
});

// Ruta para crear un usuario, incluyendo la carga de imagen
router.post('/usuarios', async (req, res) => {
  try {
    // Asignar null a departamento si el valor es una cadena vacía
    if (req.body.departamento === "") {
      req.body.departamento = null;
    }

    // Genera un `username` único basado en el nombre y apellidos
    req.body.username = await generarUsername(req.body.nombre, req.body.apellidos);

    const usuarioData = { ...req.body };
    const usuario = new Usuario(usuarioData);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(400).json({ message: 'Error al crear usuario', error });
  }
});


// Ruta para eliminar un usuario
router.delete('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
});

// Ruta para actualizar un usuario, incluyendo la actualización de la imagen de perfil
router.put('/usuarios/:id', async (req, res) => {
  try {
    const usuarioData = { ...req.body };


    const usuario = await Usuario.findByIdAndUpdate(req.params.id, usuarioData, {
      new: true,
      runValidators: true
    });
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(400).json({ message: 'Error al actualizar usuario', error });
  }
});


// Filtrar los usuarios Médicos
router.get('/usuarios/medicos', async (req, res) => {
  try {
    const medicos = await Usuario.find({ tipo: 'Médico' });
    res.status(200).json(medicos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener médicos', error });
  }
});

router.get('/usuarios/pacientes', async (req, res) => {
  try {
    const pacientes = await Usuario.find({ tipo: 'Paciente' });
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pacientes', error });
  }
});

// Ruta para obtener un usuario por ID
router.get('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).populate('departamento');
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error });
  }
});



module.exports = router;
