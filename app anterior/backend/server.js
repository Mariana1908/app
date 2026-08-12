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

// Cargar rutas de forma segura
const cargarRuta = (rutaModulo) => {
  try {
    return require(rutaModulo);
  } catch (err) {
    console.error(`⚠️ No se pudo cargar el módulo [${rutaModulo}]:`, err.message);
    return null;
  }
};

// Asignación de Rutas API
const clienteRoutes = cargarRuta('./routes/clienteRoutes');
const estadoRoutes = cargarRuta('./routes/estadoRoutes');
const visitaRoutes = cargarRuta('./routes/visitaRoutes');
const servicioRoutes = cargarRuta('./routes/servicioRoutes');
const agendaRoutes = cargarRuta('./routes/agendaRoutes');
const reportesRoutes = cargarRuta('./routes/reportesRoutes');

if (clienteRoutes) app.use('/api/clientes', clienteRoutes);
if (estadoRoutes) app.use('/api/estado', estadoRoutes);
if (visitaRoutes) app.use('/api/visitas', visitaRoutes);
if (servicioRoutes) app.use('/api/servicios', servicioRoutes);
if (agendaRoutes) app.use('/api/agenda', agendaRoutes);
if (reportesRoutes) app.use('/api/reportes', reportesRoutes);

// Ruta de prueba base
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Estética funcionando correctamente' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});