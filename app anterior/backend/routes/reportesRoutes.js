const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');

// Route: GET /api/reportes
router.get('/', reportesController.obtenerEstadisticas);

module.exports = router;