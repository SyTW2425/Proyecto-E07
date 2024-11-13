const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tipo: { type: String, required: true },
  departamento: { type: mongoose.Schema.Types.ObjectId, ref: 'Departamento', default: null },
  dni: { type: String},
  fechaNacimiento: { type: Date },
  genero: { type: String, enum: ['Masculino', 'Femenino'] },
  direccion: { type: String },
  telefono: { type: String },
  email: { type: String },
  fechaUltimoAcceso: { type: Date, default: null },
  estado: { type: String, default: 'activo' },
});


module.exports = mongoose.model('Usuario', userSchema);
