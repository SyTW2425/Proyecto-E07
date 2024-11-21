const mongoose = require('mongoose');


const citaSchema = new mongoose.Schema({
  medicoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  especialidadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Departamento', required: true },
  prestacionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prestacion', required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  duracion: { type: Number, required: true }, // Duración en minutos
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', default: null }
});

module.exports = mongoose.model('Cita', citaSchema);
