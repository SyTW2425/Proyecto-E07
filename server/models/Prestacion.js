const mongoose = require('mongoose');

const prestacionSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String },
  indicaciones: { type: String },
});


module.exports = mongoose.model('Prestacion', prestacionSchema);
