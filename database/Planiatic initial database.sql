-- phpMyAdmin SQL Dump
-- version 4.0.0-rc2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 28-05-2013 a las 01:50:55
-- Versión del servidor: 5.5.31-0ubuntu0.12.10.1
-- Versión de PHP: 5.4.6-1ubuntu1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `PlaniaticLt`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Alerts`
--

CREATE TABLE IF NOT EXISTS `Alerts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tags` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `location` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `coordinates` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_F0D6C55DA76ED395` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Categories`
--

CREATE TABLE IF NOT EXISTS `Categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Events`
--

CREATE TABLE IF NOT EXISTS `Events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eventtype_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `timestamp` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_542B527CEE61C42` (`eventtype_id`),
  KEY `IDX_542B527CA76ED395` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `EventTypes`
--

CREATE TABLE IF NOT EXISTS `EventTypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `icons` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Files`
--

CREATE TABLE IF NOT EXISTS `Files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `path` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Hobbies`
--

CREATE TABLE IF NOT EXISTS `Hobbies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `friendly` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Links`
--

CREATE TABLE IF NOT EXISTS `Links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `linktype_id` int(11) DEFAULT NULL,
  `url` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_10438E1C5DBB2F9F` (`linktype_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `LinkTypes`
--

CREATE TABLE IF NOT EXISTS `LinkTypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Logbooks`
--

CREATE TABLE IF NOT EXISTS `Logbooks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_id` int(11) DEFAULT NULL,
  `timestamp` date DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_FF26D6AAE899029B` (`plan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Messages`
--

CREATE TABLE IF NOT EXISTS `Messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `message_id` int(11) DEFAULT NULL,
  `main` int(11) DEFAULT NULL,
  `text` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_22747CC0A76ED395` (`user_id`),
  KEY `IDX_22747CC0537A1329` (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Notes`
--

CREATE TABLE IF NOT EXISTS `Notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `text` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `timestamp` date DEFAULT NULL,
  `reminder` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_C0DA8988A76ED395` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Notifications`
--

CREATE TABLE IF NOT EXISTS `Notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Plans`
--

CREATE TABLE IF NOT EXISTS `Plans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `friendly` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `timestamp` date DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `vacancies` int(11) DEFAULT NULL,
  `location` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `coordinates` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meet_point_location` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `meet_point_coordinates` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `observations` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `descriptions` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type_privacy` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PlansCategories`
--

CREATE TABLE IF NOT EXISTS `PlansCategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_1C805C20E899029B` (`plan_id`),
  KEY `IDX_1C805C2012469DE2` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PlansLinks`
--

CREATE TABLE IF NOT EXISTS `PlansLinks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_id` int(11) DEFAULT NULL,
  `link_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_7CD60D7DE899029B` (`plan_id`),
  KEY `IDX_7CD60D7DADA40271` (`link_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PlansUsers`
--

CREATE TABLE IF NOT EXISTS `PlansUsers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_B9D7098CE899029B` (`plan_id`),
  KEY `IDX_B9D7098CA76ED395` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Privacies`
--

CREATE TABLE IF NOT EXISTS `Privacies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `friendly` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Profiles`
--

CREATE TABLE IF NOT EXISTS `Profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastname` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `genre` int(11) DEFAULT NULL,
  `coordinates` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `country` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nationality` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birth_date` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `civil_status` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `social_interesting` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_7246E766A76ED395` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Relationships`
--

CREATE TABLE IF NOT EXISTS `Relationships` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id_1` int(11) DEFAULT NULL,
  `user_id_2` int(11) DEFAULT NULL,
  `universe_id_1` int(11) DEFAULT NULL,
  `universe_id_2` int(11) DEFAULT NULL,
  `status_1` int(11) DEFAULT NULL,
  `status_2` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Universes`
--

CREATE TABLE IF NOT EXISTS `Universes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_CF2DBCB3A76ED395` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `salt` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email2` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `UsersHobbies`
--

CREATE TABLE IF NOT EXISTS `UsersHobbies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `hobbie_id` int(11) DEFAULT NULL,
  `value` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_1992BF6AA76ED395` (`user_id`),
  KEY `IDX_1992BF6A50B678B7` (`hobbie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `UsersNotifications`
--

CREATE TABLE IF NOT EXISTS `UsersNotifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `notification_id` int(11) DEFAULT NULL,
  `value` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_872707B3A76ED395` (`user_id`),
  KEY `IDX_872707B3EF1A9D84` (`notification_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `UsersPrivacies`
--

CREATE TABLE IF NOT EXISTS `UsersPrivacies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `privacy_id` int(11) DEFAULT NULL,
  `value` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_3ADF7B66A76ED395` (`user_id`),
  KEY `IDX_3ADF7B6619877A6A` (`privacy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Alerts`
--
ALTER TABLE `Alerts`
  ADD CONSTRAINT `FK_F0D6C55DA76ED395` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Filtros para la tabla `Events`
--
ALTER TABLE `Events`
  ADD CONSTRAINT `FK_542B527CA76ED395` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `FK_542B527CEE61C42` FOREIGN KEY (`eventtype_id`) REFERENCES `EventTypes` (`id`);

--
-- Filtros para la tabla `Links`
--
ALTER TABLE `Links`
  ADD CONSTRAINT `FK_10438E1C5DBB2F9F` FOREIGN KEY (`linktype_id`) REFERENCES `LinkTypes` (`id`);

--
-- Filtros para la tabla `Logbooks`
--
ALTER TABLE `Logbooks`
  ADD CONSTRAINT `FK_FF26D6AAE899029B` FOREIGN KEY (`plan_id`) REFERENCES `Plans` (`id`);

--
-- Filtros para la tabla `Messages`
--
ALTER TABLE `Messages`
  ADD CONSTRAINT `FK_22747CC0537A1329` FOREIGN KEY (`message_id`) REFERENCES `Messages` (`id`),
  ADD CONSTRAINT `FK_22747CC0A76ED395` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Filtros para la tabla `Notes`
--
ALTER TABLE `Notes`
  ADD CONSTRAINT `FK_C0DA8988A76ED395` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Filtros para la tabla `PlansCategories`
--
ALTER TABLE `PlansCategories`
  ADD CONSTRAINT `FK_1C805C2012469DE2` FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`),
  ADD CONSTRAINT `FK_1C805C20E899029B` FOREIGN KEY (`plan_id`) REFERENCES `Plans` (`id`);

--
-- Filtros para la tabla `PlansLinks`
--
ALTER TABLE `PlansLinks`
  ADD CONSTRAINT `FK_7CD60D7DADA40271` FOREIGN KEY (`link_id`) REFERENCES `Links` (`id`),
  ADD CONSTRAINT `FK_7CD60D7DE899029B` FOREIGN KEY (`plan_id`) REFERENCES `Plans` (`id`);

--
-- Filtros para la tabla `PlansUsers`
--
ALTER TABLE `PlansUsers`
  ADD CONSTRAINT `FK_B9D7098CA76ED395` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `FK_B9D7098CE899029B` FOREIGN KEY (`plan_id`) REFERENCES `Plans` (`id`);

--
-- Filtros para la tabla `Profiles`
--
ALTER TABLE `Profiles`
  ADD CONSTRAINT `FK_7246E766A76ED395` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Filtros para la tabla `Universes`
--
ALTER TABLE `Universes`
  ADD CONSTRAINT `FK_CF2DBCB3A76ED395` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Filtros para la tabla `UsersHobbies`
--
ALTER TABLE `UsersHobbies`
  ADD CONSTRAINT `FK_1992BF6A50B678B7` FOREIGN KEY (`hobbie_id`) REFERENCES `Hobbies` (`id`),
  ADD CONSTRAINT `FK_1992BF6AA76ED395` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Filtros para la tabla `UsersNotifications`
--
ALTER TABLE `UsersNotifications`
  ADD CONSTRAINT `FK_872707B3EF1A9D84` FOREIGN KEY (`notification_id`) REFERENCES `Notifications` (`id`),
  ADD CONSTRAINT `FK_872707B3A76ED395` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Filtros para la tabla `UsersPrivacies`
--
ALTER TABLE `UsersPrivacies`
  ADD CONSTRAINT `FK_3ADF7B6619877A6A` FOREIGN KEY (`privacy_id`) REFERENCES `Privacies` (`id`),
  ADD CONSTRAINT `FK_3ADF7B66A76ED395` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
