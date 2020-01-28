-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 28 jan 2020 om 12:25
-- Serverversie: 10.4.6-MariaDB
-- PHP-versie: 7.2.22

SET FOREIGN_KEY_CHECKS=0;
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
CREATE DATABASE IF NOT EXISTS `reservation_system` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `reservation_system`;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `accommodations`
--

DROP TABLE IF EXISTS `accommodations`;
CREATE TABLE `accommodations` (
  `id` int(11) NOT NULL,
  `establishment_id` int(11) NOT NULL,
  `accommodation_type_id` int(11) NOT NULL,
  `room_num` int(11) NOT NULL,
  `description` varchar(300) NOT NULL,
  `price_per_night` int(11) NOT NULL,
  `image_one` varchar(100) DEFAULT NULL,
  `image_two` varchar(100) DEFAULT NULL,
  `image_three` varchar(100) DEFAULT NULL,
  `image_four` varchar(100) DEFAULT NULL,
  `image_five` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `accommodation_types`
--

DROP TABLE IF EXISTS `accommodation_types`;
CREATE TABLE `accommodation_types` (
  `id` int(11) NOT NULL,
  `max_pers` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `establishment_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `amenities`
--

DROP TABLE IF EXISTS `amenities`;
CREATE TABLE `amenities` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `amenities_per_accommodation_type`
--

DROP TABLE IF EXISTS `amenities_per_accommodation_type`;
CREATE TABLE `amenities_per_accommodation_type` (
  `accommodation_type_id` int(11) DEFAULT NULL,
  `amenity_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `cities`
--

DROP TABLE IF EXISTS `cities`;
CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `countries`
--

DROP TABLE IF EXISTS `countries`;
CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_num` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `establishments`
--

DROP TABLE IF EXISTS `establishments`;
CREATE TABLE `establishments` (
  `id` int(11) NOT NULL,
  `establishment_type_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `country_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `zipcode` varchar(50) NOT NULL,
  `street_num` varchar(50) NOT NULL,
  `street_name` varchar(50) NOT NULL,
  `description` varchar(300) NOT NULL,
  `image_one` varchar(100) DEFAULT NULL,
  `image_two` varchar(100) DEFAULT NULL,
  `image_three` varchar(100) DEFAULT NULL,
  `image_four` varchar(100) DEFAULT NULL,
  `image_five` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `establishment_types`
--

DROP TABLE IF EXISTS `establishment_types`;
CREATE TABLE `establishment_types` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `reservations`
--

DROP TABLE IF EXISTS `reservations`;
CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `booking_date` date NOT NULL,
  `customer_id` int(11) NOT NULL,
  `accommodation_id` int(11) NOT NULL,
  `num_of_pers` int(11) NOT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `num_of_nights` int(11) NOT NULL,
  `total_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `accommodations`
--
ALTER TABLE `accommodations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `establishment_id` (`establishment_id`,`room_num`),
  ADD KEY `accommodations_ibfk_2` (`accommodation_type_id`);

--
-- Indexen voor tabel `accommodation_types`
--
ALTER TABLE `accommodation_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`,`establishment_type_id`),
  ADD KEY `accommodation_types_ibfk_1` (`establishment_type_id`);

--
-- Indexen voor tabel `amenities`
--
ALTER TABLE `amenities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexen voor tabel `amenities_per_accommodation_type`
--
ALTER TABLE `amenities_per_accommodation_type`
  ADD KEY `accommodation_type_id` (`accommodation_type_id`),
  ADD KEY `amenity_id` (`amenity_id`);

--
-- Indexen voor tabel `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexen voor tabel `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexen voor tabel `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexen voor tabel `establishments`
--
ALTER TABLE `establishments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `establishments_ibfk_1` (`city_id`),
  ADD KEY `establishments_ibfk_2` (`country_id`),
  ADD KEY `establishments_ibfk_3` (`establishment_type_id`);

--
-- Indexen voor tabel `establishment_types`
--
ALTER TABLE `establishment_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexen voor tabel `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `accommodation_id` (`accommodation_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `accommodations`
--
ALTER TABLE `accommodations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `accommodation_types`
--
ALTER TABLE `accommodation_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `amenities`
--
ALTER TABLE `amenities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `establishments`
--
ALTER TABLE `establishments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `establishment_types`
--
ALTER TABLE `establishment_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `accommodations`
--
ALTER TABLE `accommodations`
  ADD CONSTRAINT `accommodations_ibfk_1` FOREIGN KEY (`establishment_id`) REFERENCES `establishments` (`id`),
  ADD CONSTRAINT `accommodations_ibfk_2` FOREIGN KEY (`accommodation_type_id`) REFERENCES `accommodation_types` (`id`);

--
-- Beperkingen voor tabel `accommodation_types`
--
ALTER TABLE `accommodation_types`
  ADD CONSTRAINT `accommodation_types_ibfk_1` FOREIGN KEY (`establishment_type_id`) REFERENCES `establishment_types` (`id`);

--
-- Beperkingen voor tabel `amenities_per_accommodation_type`
--
ALTER TABLE `amenities_per_accommodation_type`
  ADD CONSTRAINT `amenities_per_accommodation_type_ibfk_1` FOREIGN KEY (`accommodation_type_id`) REFERENCES `accommodation_types` (`id`),
  ADD CONSTRAINT `amenities_per_accommodation_type_ibfk_2` FOREIGN KEY (`amenity_id`) REFERENCES `amenities` (`id`);

--
-- Beperkingen voor tabel `establishments`
--
ALTER TABLE `establishments`
  ADD CONSTRAINT `establishments_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `establishments_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`),
  ADD CONSTRAINT `establishments_ibfk_3` FOREIGN KEY (`establishment_type_id`) REFERENCES `establishment_types` (`id`);

--
-- Beperkingen voor tabel `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`accommodation_id`) REFERENCES `accommodations` (`id`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
