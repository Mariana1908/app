const mysql = require('mysql2');
require('dotenv').config();

// Crear pool de conexiones (mejor rendimiento)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Usar promesas en lugar de callbacks
const promisePool = pool.promise();

// Verificar conexión
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error conectando a la BD:', err.message);
  } else {
    console.log('✅ Conexión exitosa a MySQL');
    connection.release();
  }
});

module.exports = promisePool;