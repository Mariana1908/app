// backend/controllers/servicioController.js
const db = require('../config/database');

exports.obtenerServicios = async (req, res) => {
  try {
    // Solo trae los servicios que estén activos
    const [rows] = await db.query('SELECT id, nombre, precio, duracion_min FROM servicios WHERE activo = TRUE');
    res.json(rows);
  } catch (error) {
    console.error('❌ Error al obtener servicios:', error.message);
    res.status(500).json({ error: 'Error al consultar los servicios en la base de datos' });
  }
};