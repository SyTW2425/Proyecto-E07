const mongoose = require('mongoose');

// Para gestionar el número incremental
const autoIncrementModelID = require('./autoIncrementModelID');

const citaSchema = new mongoose.Schema({
  numero: { type: Number, unique: true }, // Número incremental único para cada cita
  medicoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  especialidadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Especialidad', required: true },
  prestacionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prestacion', required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  duracion: { type: Number, required: true }, // Duración en minutos
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', default: null }
});

// Middleware para incrementar automáticamente el número
citaSchema.pre('save', function(next) {
  if (!this.isNew) {
    return next();
  }

  autoIncrementModelID('Cita', this, next);
});

module.exports = mongoose.model('Cita', citaSchema);
