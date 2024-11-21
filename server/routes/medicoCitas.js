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
    console.error('Error al obtener citas:', error); 
    res.status(500).json({ message: 'Error al obtener citas', detalles: error.message })
  }
});



// Ruta para crear una nueva cita
router.post('/citas', async (req, res) => {
  try {
    const { medicoId, especialidadId, prestacionId, fecha, hora, duracion, pacienteId } = req.body;
    console.log('Recibida petición cita');
    console.log('Fecha: ', fecha);
    console.log('Hora: ', hora);
    console.log('Duración: ', duracion);

    // Validar que `fecha` y `hora` sean válidos
    if (!fecha || !hora) {
      console.log('Fecha u hora no proporcionadas o inválidas');
      return res.status(400).json({ error: 'Debe proporcionar una fecha y una hora válidas' });
    }

    // Validar formato de `fecha`
    if (!fecha || isNaN(Date.parse(fecha))) {
      return res.status(400).json({ message: 'Fecha no válida' });
    }

    // Convertir la combinación de fecha y hora a un objeto Date para cálculos
    const inicioCita = new Date(`${fecha}T${hora}`);
    if (isNaN(inicioCita.getTime())) {
      return res.status(400).json({ message: 'Hora no válida' });
    }

    // Calcular la hora de finalización de la cita
    const finCita = new Date(inicioCita);
    finCita.setMinutes(inicioCita.getMinutes() + duracion);

    // Buscar citas del mismo médico que se solapen en el mismo día
    const citas = await Cita.find({
      medicoId,
      fecha // Solo consideramos citas del mismo día
    });

    // Verificar solapamientos
    const conflicto = citas.some((cita) => {
      const citaInicio = new Date(`${cita.fecha.toISOString().split('T')[0]}T${cita.hora}`); // Convertir hora a Date
      const citaFin = new Date(citaInicio);
      citaFin.setMinutes(citaInicio.getMinutes() + cita.duracion);

      // Verificar si las citas se solapan
      return (
        (citaInicio < finCita && citaFin > inicioCita) // Rango de tiempo se solapa
      );
    });

    if (conflicto) {
      console.log('El médico ya tiene una cita en esta franja horaria.');
      return res.status(400).json({ message: 'El médico ya tiene una cita en esta franja horaria.' });
    }

    // Crear y guardar la nueva cita
    const nuevaCita = await Cita.create({
      medicoId,
      especialidadId,
      prestacionId,
      fecha: new Date(fecha), // Aseguramos que sea de tipo Date
      hora, // Se almacena como String
      duracion,
      pacienteId
    });

    console.log('Cita creada exitosamente');
    res.status(201).json(nuevaCita);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map((e) => e.message);
      res.status(400).json({ error: 'Errores de validación', detalles: errores });
    } else if (error.name === 'MongoError') {
      res.status(500).json({ error: 'Error de base de datos', detalles: error.message });
    } else {
      console.error('Error al crear la cita:', error);
      res.status(500).json({ error: 'Ocurrió un error al crear la cita', detalles: error.message });
    }
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
