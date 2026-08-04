const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (fotos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/clientes', require('./routes/clienteRoutes'));
app.use('/api/estado', require('./routes/estadoRoutes'));
app.use('/api/visitas', require('./routes/visitaRoutes'));
app.use('/api/servicios', require('./routes/servicioRoutes')); // <-- AGREGAR ESTA LÍNEA

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Estética funcionando correctamente' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});