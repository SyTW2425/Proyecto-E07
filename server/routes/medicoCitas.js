const express = require('express');
const router = express.Router();
const Cita = require('../models/Cita');

// Ruta para obtener todas las citas, opcionalmente filtradas por médico o paciente
router.get('/citas', async (req, res) => {
  try {
    const { medicoId, pacienteId, fecha } = req.query;
    const filtro = {};

    if (medicoId) {
      filtro.medicoId = medicoId;
    }
    if (pacienteId) {
      filtro.pacienteId = pacienteId;
    }
    if (fecha) {
      filtro.fecha = new Date(fecha);
    }

    const citas = await Cita.find(filtro)
      .populate('medicoId', 'nombre apellidos') // Incluye campos del médico
      .populate('pacienteId', 'nombre apellidos') // Incluye campos del paciente
      .populate('especialidadId', 'nombre') // Incluye nombre de la especialidad
      .populate('prestacionId', 'nombre') // Incluye nombre de la prestación
      .sort({ fecha: 1, hora: 1 }); // Ordena por fecha y hora

    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener citas', error });
  }
});



// Ruta para crear una nueva cita
router.post('/citas', async (req, res) => {
  try {
    const { medicoId, especialidadId, prestacionId, fecha, hora, duracion, pacienteId } = req.body;

    // Convertir hora a un objeto de Date para manejar el rango de tiempo
    const inicioCita = new Date(`${fecha}T${hora}`);
    const finCita = new Date(inicioCita);
    finCita.setMinutes(inicioCita.getMinutes() + duracion); // Calcula la hora de finalización de la cita

    // Buscar citas del mismo médico que se solapen en el mismo día
    const conflicto = await Cita.findOne({
      medicoId,
      fecha,
      $or: [
        { // Cita existente empieza antes y termina después de la nueva cita
          hora: { $lte: inicioCita },
          $expr: { $gte: [{ $add: ["$hora", { $multiply: ["$duracion", 60000] }] }, inicioCita] }
        },
        { // Cita existente empieza antes y termina durante la nueva cita
          hora: { $lt: finCita },
          $expr: { $gte: [{ $add: ["$hora", { $multiply: ["$duracion", 60000] }] }, finCita] }
        },
        { // Cita existente empieza dentro de la nueva cita
          hora: { $gte: inicioCita, $lt: finCita }
        }
      ]
    });

    if (conflicto) {
      return res.status(400).json({ message: 'El médico ya tiene una cita en esta franja horaria.' });
    }

    // Crear y guardar la cita
    const nuevaCita = await Cita.create({
      medicoId,
      especialidadId,
      prestacionId,
      fecha,
      hora,
      duracion,
      pacienteId
    });

    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la cita', error });
  }
});

// Ruta para actualizar una cita existente
router.put('/citas/:id', async (req, res) => {
  try {
    const { medicoId, especialidadId, prestacionId, fecha, hora, duracion, pacienteId } = req.body;

    // Convertir hora a un objeto de Date para manejar el rango de tiempo
    const inicioCita = new Date(`${fecha}T${hora}`);
    const finCita = new Date(inicioCita);
    finCita.setMinutes(inicioCita.getMinutes() + duracion);

    // Buscar citas del mismo médico que se solapen en el mismo día, excluyendo la cita actual
    const conflicto = await Cita.findOne({
      _id: { $ne: req.params.id },
      medicoId,
      fecha,
      $or: [
        { hora: { $lte: inicioCita }, $expr: { $gte: [{ $add: ["$hora", { $multiply: ["$duracion", 60000] }] }, inicioCita] } },
        { hora: { $lt: finCita }, $expr: { $gte: [{ $add: ["$hora", { $multiply: ["$duracion", 60000] }] }, finCita] } },
        { hora: { $gte: inicioCita, $lt: finCita } }
      ]
    });

    if (conflicto) {
      return res.status(400).json({ message: 'El médico ya tiene una cita en esta franja horaria.' });
    }

    // Actualizar la cita
    const citaActualizada = await Cita.findByIdAndUpdate(req.params.id, {
      medicoId,
      especialidadId,
      prestacionId,
      fecha,
      hora,
      duracion,
      pacienteId
    }, { new: true });

    res.status(200).json(citaActualizada);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cita', error });
  }
});

// Ruta para eliminar una cita por su ID
router.delete('/citas/:id', async (req, res) => {
  try {
    await Cita.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Cita eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cita', error });
  }
});

module.exports = router;
