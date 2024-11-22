const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Ejecucción: nodemon server.js

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

// Define los orígenes permitidos
const allowedOrigins = [
  'https://hospital-rambla.netlify.app', // URL del sitio en Netlify
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
  },
  credentials: true
}));


// Middleware para procesar JSON en el cuerpo de las solicitudes
app.use(express.json());
app.use(cookieParser());

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
const departamentoRoutes = require('./routes/departamentoRoutes');
const medicoCitasRoutes = require('./routes/medicoCitas');
const prestacionRoutes = require('./routes/prestacionRoutes');
const medicoCitas = require('./routes/medicoCitas')

app.use('/api', userRoutes);         // Rutas para usuarios
app.use('/api', departamentoRoutes); // Rutas para departamentos
app.use('/api', medicoCitasRoutes);     // Rutas para citas médicas
app.use('/api', prestacionRoutes); // Rutas para prestaciones
app.use('/api', medicoCitas)

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
