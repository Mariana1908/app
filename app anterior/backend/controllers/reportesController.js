const db = require('../config/database');

// GET /api/reportes -> Obtener datos estadísticos para la vista de reportes
exports.obtenerEstadisticas = async (req, res) => {
  const { desde, hasta, estilistaId } = req.query;

  try {
    let whereCitas = ' WHERE 1=1';
    let whereClientes = ' WHERE 1=1';
    const paramsCitas = [];
    const paramsClientes = [];

    // Filtros de fecha
    if (desde) {
      whereCitas += ' AND a.fecha >= ?';
      whereClientes += ' AND DATE(c.fecha_reg) >= ?';
      paramsCitas.push(desde);
      paramsClientes.push(desde);
    }

    if (hasta) {
      whereCitas += ' AND a.fecha <= ?';
      whereClientes += ' AND DATE(c.fecha_reg) <= ?';
      paramsCitas.push(hasta);
      paramsClientes.push(hasta);
    }

    // Filtro de estilista
    if (estilistaId && estilistaId !== 'todos') {
      const parsedEstilista = parseInt(estilistaId, 10);
      if (!isNaN(parsedEstilista)) {
        whereCitas += ' AND a.estilista_id = ?';
        paramsCitas.push(parsedEstilista);
      }
    }

    // 1. Total de Citas Registradas
    const [resTotalCitas] = await db.query(
      `SELECT COUNT(*) AS total FROM agenda a ${whereCitas}`, 
      paramsCitas
    );

    // 2. Clientes Nuevos registrados
    const [resClientesNuevos] = await db.query(
      `SELECT COUNT(*) AS total FROM clientes c ${whereClientes}`, 
      paramsClientes
    );

    // 3. Desglose de Servicios Realizados
    const sqlServicios = `
      SELECT 
        COALESCE(s.nombre, 'Sin servicio') AS servicio, 
        COUNT(a.id) AS total
      FROM agenda a
      LEFT JOIN servicios s ON a.servicio_id = s.id
      ${whereCitas}
      GROUP BY s.id, s.nombre
      ORDER BY total DESC
    `;
    const [serviciosRealizados] = await db.query(sqlServicios, paramsCitas);

    res.json({
      resumen: {
        totalCitas: resTotalCitas[0] ? resTotalCitas[0].total : 0,
        clientesNuevos: resClientesNuevos[0] ? resClientesNuevos[0].total : 0
      },
      serviciosRealizados
    });

  } catch (error) {
    console.error('Error al obtener reporte de estadísticas:', error);
    res.status(500).json({ 
      error: 'Error al consultar estadísticas.', 
      detalle: error.message 
    });
  }
};