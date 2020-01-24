-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 21 jan 2020 om 15:27
-- Serverversie: 10.4.6-MariaDB
-- PHP-versie: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reservation_system`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `cities`
--

CREATE TABLE IF NOT EXISTS `cities` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `city_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `cities`
--

INSERT INTO `cities` (`city_id`, `city_name`) VALUES
(1, 'Eindhoven');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `countries`
--

CREATE TABLE IF NOT EXISTS `countries` (
  `country_id` int(11) NOT NULL AUTO_INCREMENT,
  `country_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `countries`
--

INSERT INTO `countries` (`country_id`, `country_name`) VALUES
(1, 'Netherlands');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `customers`
--

CREATE TABLE IF NOT EXISTS `customers` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `customers`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `locations`
--

CREATE TABLE IF NOT EXISTS `locations` (
  `location_id` int(11) NOT NULL AUTO_INCREMENT,
  `country_id` int(11) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  `street_number` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`location_id`),
  KEY `country_id` (`country_id`),
  KEY `city_id` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `locations`
--

INSERT INTO `locations` (`location_id`, `country_id`, `city_id`, `zipcode`, `street_number`) VALUES
(1, 1, 1, '9999 NN', '29');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `properties`
--

CREATE TABLE IF NOT EXISTS `properties` (
  `property_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `property_category_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `property_details_id` int(11) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `images` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`property_id`),
  KEY `property_category_id` (`property_category_id`),
  KEY `location_id` (`location_id`),
  KEY `property_details_id` (`property_details_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `properties`
--

INSERT INTO `properties` (`property_id`, `name`, `property_category_id`, `location_id`, `property_details_id`, `description`, `images`) VALUES
(1, 'Educom Hotel', 1, 1, 1, 'Free Wi-Fi is available in all guest rooms at this Eindhoven Educom Hotel. A deluxe continental breakfast is served daily. The Eindhoven Walk of Fame is less than a 10-minute walk away.\r\n\r\nA flat-screen cable TV with a DVD player is featured in all rooms at the Magic Castle Hotel. The private bathroom has plush bathrobes. A small fridge and coffee-making facilities are available. Suites feature a full kitchen and a separate living area.', 'hotel_educom.jpg');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `property_categories`
--

CREATE TABLE IF NOT EXISTS `property_categories` (
  `property_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`property_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `property_categories`
--

INSERT INTO `property_categories` (`property_category_id`, `category`) VALUES
(1, 'Hotel'),
(2, 'Motel');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `property_details`
--

CREATE TABLE IF NOT EXISTS `property_details` (
  `property_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `parking` tinyint(1) DEFAULT NULL,
  `restaurant` tinyint(1) DEFAULT NULL,
  `swimming_pool` tinyint(1) DEFAULT NULL,
  `pets_allowed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`property_details_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `property_details`
--

INSERT INTO `property_details` (`property_details_id`, `parking`, `restaurant`, `swimming_pool`, `pets_allowed`) VALUES
(1, 0, 1, 1, 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `reservations`
--

CREATE TABLE IF NOT EXISTS `reservations` (
  `reservation_id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `check_in_date` date DEFAULT NULL,
  `check_out_date` date DEFAULT NULL,
  `num_of_pers` int(11) DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `room_id` (`room_id`),
  KEY `customer_id` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `reservations`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `rooms`
--

CREATE TABLE IF NOT EXISTS `rooms` (
  `room_id` int(11) NOT NULL AUTO_INCREMENT,
  `room_type_id` int(11) DEFAULT NULL,
  `room_num` int(11) DEFAULT NULL,
  `room_details_id` int(11) DEFAULT NULL,
  `property_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`room_id`),
  KEY `room_type_id` (`room_type_id`),
  KEY `room_details_id` (`room_details_id`),
  KEY `property_id` (`property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `rooms`
--

INSERT INTO `rooms` (`room_id`, `room_type_id`, `room_num`, `room_details_id`, `property_id`) VALUES
(1, NULL, NULL, NULL, NULL),
(2, 2, 2, 2, 1),
(3, 3, 1, 1, 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `room_details`
--

CREATE TABLE IF NOT EXISTS `room_details` (
  `room_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `smoking` tinyint(1) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `ac` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`room_details_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `room_details`
--

INSERT INTO `room_details` (`room_details_id`, `smoking`, `wifi`, `ac`) VALUES
(1, 1, 0, 1),
(2, 0, 0, 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `room_types`
--

CREATE TABLE IF NOT EXISTS `room_types` (
  `room_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) DEFAULT NULL,
  `max_pers` int(11) DEFAULT NULL,
  `images` varchar(300) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`room_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Gegevens worden geëxporteerd voor tabel `room_types`
--

INSERT INTO `room_types` (`room_type_id`, `type`, `max_pers`, `images`, `description`) VALUES
(1, 'Standard double room', 2, 'standard_double.jpg', 'This is a standard double room with a mediocre view.'),
(2, 'Deluxe double room', 2, 'deluxe_double.jpg', 'A deluxe double room with an ocean view.'),
(3, 'Standard triple room', 3, 'standard_triple.jpg array', 'A standard triple room. ');

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `locations`
--
ALTER TABLE `locations`
  ADD CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`),
  ADD CONSTRAINT `locations_ibfk_2` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`);

--
-- Beperkingen voor tabel `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`property_category_id`) REFERENCES `property_categories` (`property_category_id`),
  ADD CONSTRAINT `properties_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `locations` (`location_id`),
  ADD CONSTRAINT `properties_ibfk_3` FOREIGN KEY (`property_details_id`) REFERENCES `property_details` (`property_details_id`);

--
-- Beperkingen voor tabel `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);

--
-- Beperkingen voor tabel `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`room_type_id`) REFERENCES `room_types` (`room_type_id`),
  ADD CONSTRAINT `rooms_ibfk_2` FOREIGN KEY (`room_details_id`) REFERENCES `room_details` (`room_details_id`),
  ADD CONSTRAINT `rooms_ibfk_3` FOREIGN KEY (`property_id`) REFERENCES `properties` (`property_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
