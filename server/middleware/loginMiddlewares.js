const rateLimit = require('express-rate-limit');
const { check } = require('express-validator');

// Configura el middleware de limitación de tasa
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Limita cada IP a 5 solicitudes por ventana de 15 minutos
  message: 'Demasiados intentos de inicio de sesión, por favor intente de nuevo más tarde.'
});

// Validación de entradas
const validateLogin = [
  check('username').isString().notEmpty().withMessage('El nombre de usuario es obligatorio'),
  check('password').isString().notEmpty().withMessage('La contraseña es obligatoria')
];

module.exports = {
  loginLimiter,
  validateLogin
};