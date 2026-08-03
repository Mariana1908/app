const db = require('../config/database'); // Importa promisePool desde database.js

// GET: Obtener todos los servicios registrados usando async/await
exports.obtenerServicios = async (req, res) => {
  try {
    // Al usar mysql2 con promise, db.query devuelve un arreglo: [filas, campos]
    const [rows] = await db.query('SELECT * FROM servicios');
    res.json(rows);
  } catch (error) {
    console.error('❌ Error al obtener servicios:', error.message);
    res.status(500).json({ error: 'Error al consultar los servicios en la base de datos' });
  }
};