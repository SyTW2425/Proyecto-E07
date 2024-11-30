const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuario = require('../models/Usuario');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generarUsername } = require('../utils'); 
require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    console.log(profile);
    let usuario = await Usuario.findOne({ googleId: profile.id });
    if (!usuario) {
      // Verificar si el email ya existe
      usuario = await Usuario.findOne({ email: profile.emails[0].value });
      if (usuario) {
        // Actualizar el googleId del usuario existente
        usuario.googleId = profile.id;
      } else {
        const randomPassword = crypto.randomBytes(8).toString('hex'); 
        const hashedPassword = await bcrypt.hash(randomPassword, 10);
        const username = await generarUsername(profile.name.givenName, profile.name.familyName || 'Apellido');

        usuario = new Usuario({
          googleId: profile.id,
          nombre: profile.name.givenName,
          apellidos: profile.name.familyName || 'Apellido no proporcionado',
          email: profile.emails[0].value,
          username: username, 
          password: hashedPassword, 
          tipo: 'Paciente',
          genero: profile.gender || 'No especificado' ,
          fechaNacimiento: profile.birthday || null
        });
      }
      await usuario.save();
    }
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    usuario.token = token;
    done(null, usuario);
  } catch (error) {
    done(error, null);
  }
}));

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await Usuario.findById(id);
    done(null, usuario);
  } catch (error) {
    done(error, null);
  }
});