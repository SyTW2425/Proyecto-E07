const mongoose = require('mongoose');

const contact_formSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  asunto: { type: String, required: true },
  mensaje: { type: String, required: true }  
});

module.exports = mongoose.model('contact_form', contact_formSchema);
