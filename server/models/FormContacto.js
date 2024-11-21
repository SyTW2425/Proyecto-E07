const mongoose = require('mongoose');

const prestacionSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  email: { type: String },
  asunto: { type: String },
  mensaje: { type: String },
});


module.exports = mongoose.model('FormContacto', prestacionSchema);
