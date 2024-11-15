const mongoose = require('mongoose');

const departamentoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  tipo: { type: String, required: true, enum: ["Especialidad médica", "Administración"] },
  prestaciones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prestacion', // Referencia a la colección Prestacion
    required: false
  }]
});

module.exports = mongoose.model('Departamento', departamentoSchema);
