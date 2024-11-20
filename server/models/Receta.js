const mongoose = require('mongoose');

// Para gestionar el número incremental
const autoIncrementModelID = require('./autoIncrementModelID');

const recetaSchema = new mongoose.Schema({
  numero: { type: Number, unique: true }, // Número incremental único para cada receta
  medicoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  descripcion: { type: String, required: true },
  medicamentos: { type: String, required: true },
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', default: null }
});

// Middleware para incrementar automáticamente el número
recetaSchema.pre('save', function(next) {
  if (!this.isNew) {
    return next();
  }

  autoIncrementModelID('Receta', this, next);
});

module.exports = mongoose.model('Receta', recetaSchema);
