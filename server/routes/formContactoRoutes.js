const express = require('express');
const router = express.Router();
const FormContacto = require('../models/FormContacto');

// Ruta para obtener todas las formContacto
router.get('/formContacto', async (req, res) => {
  try {
    const formContacto = await FormContacto.find();
    res.status(200).json(formContacto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener formContacto', error });
  }
});

// Ruta para crear una form_contacto
router.post('/formContacto', async (req, res) => {
  try {
    const form_contacto = new FormContacto(req.body);
    await form_contacto.save();
    res.status(201).json(form_contacto);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear form_contacto', error });
  }
});

// Ruta para actualizar una form_contacto
router.put('/formContacto/:id', async (req, res) => {
  try {
    const form_contacto = await FormContacto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!form_contacto) {
      return res.status(404).json({ message: 'Form_contacto no encontrada' });
    }
    res.status(200).json(form_contacto);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar form_contacto', error });
  }
});

// Ruta para eliminar una form_contacto
router.delete('/formContacto/:id', async (req, res) => {
  try {
    const form_contacto = await FormContacto.findByIdAndDelete(req.params.id);
    if (!form_contacto) {
      return res.status(404).json({ message: 'Form_contacto no encontrada' });
    }
    res.status(200).json({ message: 'Form_contacto eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar form_contacto', error });
  }
});

module.exports = router;
