-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 24 jan 2020 om 11:07
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
CREATE DATABASE IF NOT EXISTS `reservation_system` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `reservation_system`;

--
-- Gegevens worden geëxporteerd voor tabel `accommodations`
--

INSERT INTO `accommodations` (`id`, `establishment_id`, `accommodation_type_id`, `room_num`, `description`, `price_per_night`, `image_one`, `image_two`, `image_three`, `image_four`, `image_five`) VALUES
(1, 1, 1, 1, 'Fusce ornare in massa non rhoncus. Nullam id purus et ex ornare vulputate sit amet sit amet ex. Vivamus sollicitudin mi id velit blandit mattis. Mauris nec urna euismod, bibendum urna et, eleifend magna. Curabitur ultrices convallis finibus. Vestibulum nulla sapien, malesuada pretium feugiat eget.', 140, NULL, NULL, NULL, NULL, NULL),
(2, 1, 1, 2, 'Fusce ornare in massa non rhoncus. Nullam id purus et ex ornare vulputate sit amet sit amet ex. Vivamus sollicitudin mi id velit blandit mattis. Mauris nec urna euismod, bibendum urna et, eleifend magna. Curabitur ultrices convallis finibus. Vestibulum nulla sapien, malesuada pretium feugiat eget.', 145, NULL, NULL, NULL, NULL, NULL),
(3, 1, 1, 3, 'Fusce ornare in massa non rhoncus. Nullam id purus et ex ornare vulputate sit amet sit amet ex. Vivamus sollicitudin mi id velit blandit mattis. Mauris nec urna euismod, bibendum urna et, eleifend magna. Curabitur ultrices convallis finibus. Vestibulum nulla sapien, malesuada pretium feugiat eget.', 145, NULL, NULL, NULL, NULL, NULL),
(4, 1, 2, 4, 'Aenean vitae pretium sapien. Etiam quis augue dictum, fringilla urna a, accumsan turpis. Nam scelerisque eros ipsum, sit amet ultricies massa vestibulum vitae. Nam posuere magna nec pellentesque fermentum. Fusce eu nibh sollicitudin, vulputate urna id, lobortis ex. Cras dictum.', 180, NULL, NULL, NULL, NULL, NULL),
(5, 1, 2, 5, 'Aenean vitae pretium sapien. Etiam quis augue dictum, fringilla urna a, accumsan turpis. Nam scelerisque eros ipsum, sit amet ultricies massa vestibulum vitae. Nam posuere magna nec pellentesque fermentum. Fusce eu nibh sollicitudin, vulputate urna id, lobortis ex. Cras dictum.', 180, NULL, NULL, NULL, NULL, NULL),
(6, 1, 2, 6, 'Aenean vitae pretium sapien. Etiam quis augue dictum, fringilla urna a, accumsan turpis. Nam scelerisque eros ipsum, sit amet ultricies massa vestibulum vitae. Nam posuere magna nec pellentesque fermentum. Fusce eu nibh sollicitudin, vulputate urna id, lobortis ex. Cras dictum.', 190, NULL, NULL, NULL, NULL, NULL),
(7, 1, 3, 7, 'Fusce ornare in massa non rhoncus. Nullam id purus et ex ornare vulputate sit amet sit amet ex. Vivamus sollicitudin mi id velit blandit mattis. Mauris nec urna euismod, bibendum urna et, eleifend magna. Curabitur ultrices convallis finibus. Vestibulum nulla sapien, malesuada pretium feugiat eget.', 210, NULL, NULL, NULL, NULL, NULL),
(8, 1, 3, 8, 'Fusce ornare in massa non rhoncus. Nullam id purus et ex ornare vulputate sit amet sit amet ex. Vivamus sollicitudin mi id velit blandit mattis. Mauris nec urna euismod, bibendum urna et, eleifend magna. Curabitur ultrices convallis finibus. Vestibulum nulla sapien, malesuada pretium feugiat eget.', 210, NULL, NULL, NULL, NULL, NULL),
(9, 1, 3, 9, 'Fusce ornare in massa non rhoncus. Nullam id purus et ex ornare vulputate sit amet sit amet ex. Vivamus sollicitudin mi id velit blandit mattis. Mauris nec urna euismod, bibendum urna et, eleifend magna. Curabitur ultrices convallis finibus. Vestibulum nulla sapien, malesuada pretium feugiat eget.', 215, NULL, NULL, NULL, NULL, NULL);

--
-- Gegevens worden geëxporteerd voor tabel `accommodation_types`
--

INSERT INTO `accommodation_types` (`id`, `max_pers`, `name`, `establishment_type_id`) VALUES
(1, 2, 'Standard double room', 1),
(2, 2, 'Deluxe double room', 1),
(3, 3, 'Standard triple room', 1),
(4, 4, 'Standard quadruple room', 1);

--
-- Gegevens worden geëxporteerd voor tabel `amenities`
--

INSERT INTO `amenities` (`id`, `name`) VALUES
(1, 'ac'),
(5, 'blow_dryer'),
(3, 'jacuzzi'),
(4, 'pets_allowed'),
(2, 'smoking');

--
-- Gegevens worden geëxporteerd voor tabel `amenities_per_accommodation`
--

INSERT INTO `amenities_per_accommodation` (`id`, `amenity_id`) VALUES
(2, 5),
(3, 5),
(6, 2),
(6, 5),
(7, 3),
(8, 3),
(9, 3),
(9, 5);

--
-- Gegevens worden geëxporteerd voor tabel `cities`
--

INSERT INTO `cities` (`id`, `name`) VALUES
(4, 'Antwerpen'),
(3, 'Breda'),
(1, 'Eindhoven'),
(2, 'Tilburg');

--
-- Gegevens worden geëxporteerd voor tabel `countries`
--

INSERT INTO `countries` (`id`, `name`) VALUES
(2, 'Belgium'),
(1, 'Netherlands');

--
-- Gegevens worden geëxporteerd voor tabel `customers`
--

INSERT INTO `customers` (`id`, `first_name`, `last_name`, `email`, `phone_num`) VALUES
(1, 'Henk', 'Poort', 'h.poort@gmail.info', '1234567891'),
(2, 'Beyoncé', 'van der Huize', 'b.huize@hotmail.com', '0485920348'),
(3, 'Frank', 'Ocean', 'frankzee@hotmail.nl', '0713807123');

--
-- Gegevens worden geëxporteerd voor tabel `establishments`
--

INSERT INTO `establishments` (`id`, `establishment_type_id`, `name`, `country_id`, `city_id`, `zipcode`, `street_num`, `street_name`, `description`, `image_one`, `image_two`, `image_three`, `image_four`, `image_five`) VALUES
(1, 1, 'Hotel Educom', 1, 1, '5641 JA ', '16-10', 'Daalakkersweg', 'Duis quis justo est. Vestibulum id augue in odio tincidunt auctor sed sit amet massa. Curabitur ac sollicitudin arcu. Nam non risus gravida, condimentum arcu nec, gravida diam. Donec vitae magna hendrerit, ultricies metus a, finibus mi. Aliquam eget tempus nulla, aliquam convallis ex. ', NULL, NULL, NULL, NULL, NULL);

--
-- Gegevens worden geëxporteerd voor tabel `establishment_types`
--

INSERT INTO `establishment_types` (`id`, `name`) VALUES
(2, 'Camping'),
(1, 'Hotel');

--
-- Gegevens worden geëxporteerd voor tabel `reservations`
--

INSERT INTO `reservations` (`id`, `booking_date`, `customer_id`, `accommodation_id`, `num_of_pers`, `check_in_date`, `check_out_date`, `num_of_nights`, `total_price`) VALUES
(1, '2020-01-24', 2, 9, 2, '2020-02-13', '2020-02-17', 4, 860),
(2, '2020-01-23', 3, 2, 1, '2020-02-23', '2020-02-25', 2, 290),
(3, '2020-01-23', 1, 6, 2, '2020-02-27', '2020-02-29', 2, 380),
(4, '2020-01-24', 2, 7, 1, '2020-02-23', '2020-02-24', 1, 210),
(5, '2020-01-24', 1, 1, 2, '2020-02-23', '2020-02-24', 1, 140);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
