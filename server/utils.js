const Usuario = require('./models/Usuario');

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
    usernameExiste = !!usuarioExistente; 
  }

  return username;
}

// Función para generar un número de póliza aleatorio
function generarNumeroPoliza() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let numeroPoliza = '';
  for (let i = 0; i < 10; i++) {
    numeroPoliza += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return numeroPoliza;
}

module.exports = {
  generarUsername,
  generarNumeroPoliza
};