const mongoose = require('mongoose');

const departamentoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  tipo: { type: String, required: true, enum: ["Especialidad médica", "Administración"] },
  operaciones: {
    type: [String],
    required: false,
    validate: {
      validator: function(ops) {
        return ops.every(op => ["Consulta", "Intervención"].includes(op));
      },
      message: props => `${props.value} no es una operación permitida`
    }
  }
});

module.exports = mongoose.model('Departamento', departamentoSchema);
