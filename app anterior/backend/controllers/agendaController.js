const db = require('../config/database');

// GET /api/agenda -> Obtener todas las citas
exports.obtenerCitas = async (req, res) => {
  try {
    const sql = `
      SELECT 
        a.id,
        a.fecha,
        a.hora,
        a.cliente_tel,
        a.notas,
        COALESCE(c.nombre, a.cliente_tel, 'Cliente General') AS cliente,
        e.nombre AS estilista,
        s.nombre AS servicio,
        p.descripcion AS estado
      FROM agenda a
      LEFT JOIN clientes c ON a.cliente_id = c.id
      LEFT JOIN estilistas e ON a.estilista_id = e.id
      LEFT JOIN servicios s ON a.servicio_id = s.id
      LEFT JOIN pivote p ON a.estado_id = p.id
      ORDER BY a.fecha DESC, a.hora ASC
    `;
    const [citas] = await db.query(sql);
    res.json(citas);
  } catch (error) {
    console.error('Error al obtener agenda:', error);
    res.status(500).json({ error: 'Error al consultar las citas.', detalle: error.message });
  }
};

// POST /api/agenda -> Crear nueva cita desde Angular
exports.crearCita = async (req, res) => {
  const { cliente, estilista, servicioId, fecha, horaInicio, notas } = req.body;

  if (!cliente || !estilista || !servicioId || !fecha || !horaInicio) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar completos.' });
  }

  try {
    // 1. Buscar cliente por nombre
    let clienteId = null;
    let clienteTel = null;
    if (cliente && cliente.trim()) {
      const [clientesEncontrados] = await db.query(
        'SELECT id, tel FROM clientes WHERE nombre LIKE ? LIMIT 1',
        [`%${cliente.trim()}%`]
      );
      if (clientesEncontrados.length > 0) {
        clienteId = clientesEncontrados[0].id;
        clienteTel = clientesEncontrados[0].tel;
      }
    }

    // 2. Formatear la hora
    const horaFormateada = horaInicio.length === 5 ? `${horaInicio}:00` : horaInicio;

    // 3. Obtener el id del estado Pendiente en tabla pivote (tipo S)
    const [estadoPendiente] = await db.query(
      "SELECT id FROM pivote WHERE tipo = 'S' AND clave = 'P' LIMIT 1"
    );
    const estadoId = estadoPendiente.length > 0 ? estadoPendiente[0].id : null;

    // 4. Parsear IDs previniendo valores 'NaN'
    const estilistaParsed = parseInt(estilista, 10);
    const servicioParsed = parseInt(servicioId, 10);

    const estilistaFinal = isNaN(estilistaParsed) ? null : estilistaParsed;
    const servicioFinal = isNaN(servicioParsed) ? null : servicioParsed;

    const sql = `
      INSERT INTO agenda (fecha, hora, cliente_id, cliente_tel, estilista_id, servicio_id, notas, estado_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      fecha,
      horaFormateada,
      clienteId,
      clienteTel,
      estilistaFinal,
      servicioFinal,
      notas || null,
      estadoId
    ];

    const [result] = await db.query(sql, values);

    res.status(201).json({
      message: 'Cita agendada correctamente',
      id: result.insertId
    });

  } catch (error) {
    console.error('Error al registrar en agenda:', error);
    res.status(500).json({ error: 'Error interno del servidor al guardar la cita.', detalle: error.message });
  }
};

// GET /api/agenda/reportes -> Datos para la vista de Reportes y Estadísticas
exports.obtenerEstadisticas = async (req, res) => {
  const { desde, hasta, estilistaId } = req.query;

  try {
    let whereCitas = ' WHERE 1=1';
    let whereClientes = ' WHERE 1=1';
    const paramsCitas = [];
    const paramsClientes = [];

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

    if (estilistaId && estilistaId !== 'todos') {
      const parsedEstilista = parseInt(estilistaId, 10);
      if (!isNaN(parsedEstilista)) {
        whereCitas += ' AND a.estilista_id = ?';
        paramsCitas.push(parsedEstilista);
      }
    }

    // 1. Total Citas Atendidas / Agendadas
    const sqlTotalCitas = `SELECT COUNT(*) AS total FROM agenda a ${whereCitas}`;
    const [resTotalCitas] = await db.query(sqlTotalCitas, paramsCitas);
    const totalCitas = resTotalCitas[0] ? resTotalCitas[0].total : 0;

    // 2. Clientes Nuevos registrados
    const sqlClientesNuevos = `SELECT COUNT(*) AS total FROM clientes c ${whereClientes}`;
    const [resClientesNuevos] = await db.query(sqlClientesNuevos, paramsClientes);
    const clientesNuevos = resClientesNuevos[0] ? resClientesNuevos[0].total : 0;

    // 3. Desglose de servicios realizados
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
        totalCitas,
        clientesNuevos
      },
      serviciosRealizados
    });

  } catch (error) {
    console.error('Error al obtener reporte de estadísticas:', error);
    res.status(500).json({ error: 'Error al consultar estadísticas.', detalle: error.message });
  }
};