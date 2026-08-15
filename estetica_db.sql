-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-08-2026 a las 05:56:27
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `estetica_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agenda`
--

CREATE TABLE `agenda` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `cliente_tel` varchar(30) DEFAULT NULL,
  `estilista_id` int(11) DEFAULT NULL,
  `servicio_id` int(11) DEFAULT NULL,
  `origen_id` int(11) DEFAULT NULL,
  `notas` text DEFAULT NULL,
  `estado_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `agenda`
--

INSERT INTO `agenda` (`id`, `fecha`, `hora`, `cliente_id`, `cliente_tel`, `estilista_id`, `servicio_id`, `origen_id`, `notas`, `estado_id`, `created_at`, `updated_at`) VALUES
(2, '2026-08-11', '15:30:00', 1, '3312345678', 1, 1, NULL, 'Cita de prueba', 1, '2026-08-12 01:41:24', '2026-08-12 01:41:24'),
(3, '2026-08-12', '08:00:00', NULL, NULL, NULL, 8, NULL, 'se quebran facilmente', 11, '2026-08-12 02:09:56', '2026-08-12 02:09:56'),
(4, '2026-08-11', '20:26:00', NULL, NULL, NULL, 12, NULL, 'Cita de prueba 2', 11, '2026-08-12 02:27:35', '2026-08-12 02:27:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `domicilio` varchar(255) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `cp` varchar(10) DEFAULT NULL,
  `fecha_nac` date DEFAULT NULL,
  `fecha_reg` date DEFAULT NULL,
  `tel` varchar(30) DEFAULT NULL,
  `instagram` varchar(100) DEFAULT NULL,
  `facebook` varchar(100) DEFAULT NULL,
  `id_permisos` int(11) DEFAULT NULL,
  `estatus` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `color_nat` varchar(100) DEFAULT NULL,
  `porc_canas` decimal(5,2) DEFAULT NULL,
  `textura` varchar(100) DEFAULT NULL,
  `colorimetrista` varchar(150) DEFAULT NULL,
  `estructura` text DEFAULT NULL,
  `form_decol` text DEFAULT NULL,
  `pose_decol_largos` int(11) DEFAULT NULL,
  `pose_decol_raiz` int(11) DEFAULT NULL,
  `form_tinte` text DEFAULT NULL,
  `pose_tinte_largos` int(11) DEFAULT NULL,
  `pose_tinte_raiz` int(11) DEFAULT NULL,
  `fecha_foto1` datetime DEFAULT NULL,
  `foto1` varchar(255) DEFAULT NULL,
  `fecha_foto2` datetime DEFAULT NULL,
  `foto2` varchar(255) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `id` int(11) NOT NULL,
  `permisos` varchar(20) NOT NULL DEFAULT '0,0,0,0,0',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pivote`
--

CREATE TABLE `pivote` (
  `id` int(11) NOT NULL,
  `tipo` char(1) NOT NULL,
  `clave` varchar(4) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pivote`
--

INSERT INTO `pivote` (`id`, `tipo`, `clave`, `descripcion`, `activo`, `created_at`, `updated_at`) VALUES
(1, 'A', 'RED', 'Redes Sociales', 1, '2026-07-11 05:10:02', '2026-07-11 05:10:02'),
(2, 'A', 'WAPP', 'WhatsApp', 1, '2026-07-11 05:10:02', '2026-07-11 05:10:02'),
(3, 'A', 'TEL', 'Tel?fono', 1, '2026-07-11 05:10:02', '2026-07-11 05:10:02'),
(4, 'A', 'FIS', 'F?sica', 1, '2026-07-11 05:10:02', '2026-07-11 05:10:02'),
(5, 'A', 'REF', 'Referido', 1, '2026-07-11 05:10:02', '2026-07-11 05:10:02'),
(6, 'A', 'WEB', 'Sitio Web', 1, '2026-07-11 05:10:02', '2026-07-11 05:10:02'),
(7, 'E', 'EST', 'Estilista', 1, '2026-07-11 05:10:02', '2026-07-11 05:10:02'),
(8, 'E', 'AST', 'Asistente', 1, '2026-07-11 05:10:02', '2026-07-11 05:10:02'),
(9, 'E', 'RECP', 'Recepcionista', 1, '2026-07-11 05:10:02', '2026-07-11 05:10:02'),
(10, 'E', 'ADMN', 'Administrador', 1, '2026-07-11 05:10:02', '2026-07-11 05:10:02'),
(11, 'S', 'P', 'Pendiente', 1, '2026-07-11 05:10:02', '2026-07-11 05:10:02'),
(12, 'S', 'C', 'Confirmada', 1, '2026-07-11 05:10:02', '2026-07-11 05:10:02'),
(13, 'S', 'A', 'Asisti?', 1, '2026-07-11 05:10:02', '2026-07-11 05:10:02'),
(14, 'S', 'N', 'No Asisti?', 1, '2026-07-11 05:10:02', '2026-07-11 05:10:02'),
(15, 'S', 'X', 'Cancelada', 1, '2026-07-11 05:10:02', '2026-07-11 05:10:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `precio` decimal(10,2) DEFAULT 0.00,
  `activo` tinyint(1) DEFAULT 1,
  `duracion_min` int(11) DEFAULT 30,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `nombre`, `precio`, `activo`, `duracion_min`, `created_at`, `updated_at`) VALUES
(5, 'Corte de cabello', 150.00, 1, 30, '2026-08-04 04:51:58', '2026-08-04 04:51:58'),
(6, 'Coloración', 450.00, 1, 90, '2026-08-04 04:51:58', '2026-08-04 04:51:58'),
(7, 'Peinado', 250.00, 1, 45, '2026-08-04 04:51:58', '2026-08-04 04:51:58'),
(8, 'Manicura', 180.00, 1, 40, '2026-08-04 04:51:58', '2026-08-04 04:51:58'),
(9, 'Pedicura', 220.00, 1, 45, '2026-08-04 04:51:58', '2026-08-04 04:51:58'),
(10, 'Facial', 350.00, 1, 60, '2026-08-04 04:51:58', '2026-08-04 04:51:58'),
(11, 'Masaje', 500.00, 1, 60, '2026-08-04 04:51:58', '2026-08-04 04:51:58'),
(12, 'Depilación', 200.00, 1, 30, '2026-08-04 04:51:58', '2026-08-04 04:51:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitas`
--

CREATE TABLE `visitas` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `estilista_id` int(11) DEFAULT NULL,
  `tipo` enum('Raiz','Largo','Matiz','Cambio de color') DEFAULT NULL,
  `retoque` text DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `peticiones` text DEFAULT NULL,
  `tipo_cambio` enum('Efecto de color','Limpieza de Color','Cambio de color') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cliente_id` (`cliente_id`),
  ADD KEY `estilista_id` (`estilista_id`),
  ADD KEY `servicio_id` (`servicio_id`),
  ADD KEY `fecha` (`fecha`,`hora`),
  ADD KEY `cliente_tel` (`cliente_tel`),
  ADD KEY `origen_id` (`origen_id`),
  ADD KEY `estado_id` (`estado_id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_clientes_tel` (`tel`),
  ADD KEY `id_permisos` (`id_permisos`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pivote`
--
ALTER TABLE `pivote`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo` (`tipo`,`activo`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `visitas`
--
ALTER TABLE `visitas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cliente_id` (`cliente_id`),
  ADD KEY `estilista_id` (`estilista_id`),
  ADD KEY `fecha` (`fecha`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `agenda`
--
ALTER TABLE `agenda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pivote`
--
ALTER TABLE `pivote`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `visitas`
--
ALTER TABLE `visitas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `agenda`
--
ALTER TABLE `agenda`
  ADD CONSTRAINT `agenda_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `agenda_ibfk_2` FOREIGN KEY (`estilista_id`) REFERENCES `estilistas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `agenda_ibfk_3` FOREIGN KEY (`servicio_id`) REFERENCES `servicios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `agenda_ibfk_4` FOREIGN KEY (`origen_id`) REFERENCES `pivote` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `agenda_ibfk_5` FOREIGN KEY (`estado_id`) REFERENCES `pivote` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`id_permisos`) REFERENCES `permisos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `estado`
--
ALTER TABLE `estado`
  ADD CONSTRAINT `estado_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `visitas`
--
ALTER TABLE `visitas`
  ADD CONSTRAINT `visitas_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `visitas_ibfk_2` FOREIGN KEY (`estilista_id`) REFERENCES `estilistas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
