const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioController');

// Definir el endpoint GET /api/servicios
router.get('/', servicioController.obtenerServicios);

module.exports = router;