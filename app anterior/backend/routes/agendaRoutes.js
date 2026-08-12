const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

// Ruta del reporte para Angular
router.get('/reportes', agendaController.obtenerEstadisticas);

// Rutas generales de la agenda
router.get('/', agendaController.obtenerCitas);
router.post('/', agendaController.crearCita);

module.exports = router;