const mongoose = require('mongoose');

const recetaSchema = new mongoose.Schema({
  medicoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  medicamentos: { type: String, required: true },
  observaciones: { type: String },
});

module.exports = mongoose.model('Receta', recetaSchema);
