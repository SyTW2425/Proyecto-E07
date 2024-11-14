const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Ejecucción: nodemon server.js

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();



// Define los orígenes permitidos
const allowedOrigins = [
  'https://joyful-sopapillas-cb1211.netlify.app', // Reemplaza con la URL de tu sitio en Netlify
  'http://localhost:8080',                    // Para desarrollo local
  'http://localhost:8081',
  'https://sistema-gestor-hospitalario.onrender.com'   
];

// Configura el middleware de CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origen no permitido por CORS: ${origin}`));
    }
  }
}));


// Middleware para procesar JSON en el cuerpo de las solicitudes
app.use(express.json());

// Middleware para loggear todas las solicitudes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
  next();
});

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((error) => console.error('Error al conectar a MongoDB Atlas:', error));

// Ruta principal de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido al backend');
});

// Rutas de usuarios
const userRoutes = require('./routes/userRoutes');
const departamentoRoutes = require('./routes/departamentoRoutes'); // Nueva ruta
const medicoCitasRoutes = require('./routes/medicoCitas');
const prestacionRoutes = require('./routes/prestacionRoutes');

app.use('/api', userRoutes);         // Rutas para usuarios
app.use('/api', departamentoRoutes); // Rutas para departamentos
app.use('/api', medicoCitasRoutes);     // Rutas para citas médicas
app.use('/api', prestacionRoutes); // Rutas para prestaciones


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
