const mongoose = require('mongoose');

const form_contactoSchema = new mongoose.Schema({
  nombre: { type: String, required: true},
  email: { type: String, required: true},
  asunto: { type: String, required: true},
  mensaje: { type: String, required: true},
});

module.exports = mongoose.model('FormContacto', form_contactoSchema);
