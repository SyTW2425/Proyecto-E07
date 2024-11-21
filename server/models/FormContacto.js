const mongoose = require('mongoose');

const autoIncrementModelID = require('./autoIncrementModelID');

const form_contactoSchema = new mongoose.Schema({
  numero: { type: Number, unique: true },
  nombre: { type: String, required: true},
  email: { type: String, required: true},
  asunto: { type: String, required: true},
  mensaje: { type: String, required: true},
});

// Middleware para incrementar automáticamente el número
form_contactoSchema.pre('save', function(next) {
  if (!this.isNew) {
    return next();
  }

  autoIncrementModelID('FormContacto', this, next);
});

module.exports = mongoose.model('FormContacto', prestacionSchema);
