const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellidos: { type: String, required: true },
  username: { type: String },
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

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Usuario', userSchema);
