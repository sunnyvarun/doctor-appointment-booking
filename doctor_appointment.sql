-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 02, 2025 at 07:40 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doctor_appointment`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `slot_id` int(11) NOT NULL,
  `status` enum('booked','completed','cancelled') NOT NULL DEFAULT 'booked',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `patient_id`, `doctor_id`, `slot_id`, `status`, `created_at`) VALUES
(1, 1, 19, 32, 'cancelled', '2025-05-09 12:50:25'),
(2, 1, 18, 29, 'cancelled', '2025-05-09 12:50:46'),
(3, 1, 17, 27, 'cancelled', '2025-05-09 12:55:42'),
(4, 1, 17, 25, 'cancelled', '2025-05-09 12:55:53'),
(5, 1, 17, 24, 'cancelled', '2025-05-09 16:11:12'),
(6, 1, 17, 26, 'cancelled', '2025-05-09 16:11:42'),
(7, 1, 20, 34, 'cancelled', '2025-05-09 16:45:47'),
(8, 1, 17, 26, 'cancelled', '2025-05-11 16:47:27'),
(9, 1, 18, 30, 'cancelled', '2025-05-13 12:27:32');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `specialization` varchar(255) NOT NULL,
  `bio` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `user_id`, `specialization`, `bio`) VALUES
(17, 24, 'Cardiology', 'Board-certified cardiologist with 15 years of experience'),
(18, 25, 'Pediatrics', 'Pediatric specialist focused on child development'),
(19, 26, 'Dermatology', 'Skin care expert with advanced training'),
(20, 27, 'Orthopedics', 'Orthopedic surgeon specializing in sports medicine');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_slots`
--

CREATE TABLE `doctor_slots` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_slots`
--

INSERT INTO `doctor_slots` (`id`, `doctor_id`, `date`, `start_time`, `end_time`, `created_at`) VALUES
(24, 17, '2025-05-10', '09:00:00', '09:30:00', '2025-05-09 10:53:46'),
(25, 17, '2025-05-10', '10:00:00', '10:30:00', '2025-05-09 10:53:46'),
(26, 17, '2025-05-12', '09:00:00', '09:30:00', '2025-05-09 10:53:46'),
(27, 17, '2025-05-12', '11:00:00', '11:30:00', '2025-05-09 10:53:46'),
(28, 18, '2025-05-10', '14:00:00', '14:30:00', '2025-05-09 10:53:46'),
(29, 18, '2025-05-11', '15:00:00', '15:30:00', '2025-05-09 10:53:46'),
(30, 18, '2025-05-13', '13:00:00', '13:30:00', '2025-05-09 10:53:46'),
(31, 19, '2025-05-10', '11:00:00', '11:30:00', '2025-05-09 10:53:46'),
(32, 19, '2025-05-11', '09:00:00', '09:30:00', '2025-05-09 10:53:46'),
(33, 19, '2025-05-14', '16:00:00', '16:30:00', '2025-05-09 10:53:46'),
(34, 20, '2025-05-11', '08:00:00', '08:30:00', '2025-05-09 10:53:46'),
(35, 20, '2025-05-13', '10:00:00', '10:30:00', '2025-05-09 10:53:46'),
(36, 20, '2025-05-15', '09:00:00', '09:30:00', '2025-05-09 10:53:46');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `role` enum('patient','doctor','admin') NOT NULL DEFAULT 'patient',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `phone`, `role`, `created_at`) VALUES
(1, '23315a1222@it.sreenidhi.edu.in', '$2y$10$mq8k9wPXQTe3fXoN0z8Ere9kmp/ICM8wBjRzkNCqDgnF3IC3E2z6e', 'Varun Sunny', '9550741375', 'patient', '2025-05-09 09:51:47'),
(24, 'dr.smith@clinic.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Dr. Sarah Smith', '5550101234', 'doctor', '2025-05-09 10:53:46'),
(25, 'dr.johnson@clinic.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Dr. Michael Johnson', '5550105678', 'doctor', '2025-05-09 10:53:46'),
(26, 'dr.williams@clinic.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Dr. Emily Williams', '5550109012', 'doctor', '2025-05-09 10:53:46'),
(27, 'dr.brown@clinic.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Dr. David Brown', '5550103456', 'doctor', '2025-05-09 10:53:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `slot_id` (`slot_id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `doctor_slots`
--
ALTER TABLE `doctor_slots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `doctor_slots`
--
ALTER TABLE `doctor_slots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`slot_id`) REFERENCES `doctor_slots` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `doctor_slots`
--
ALTER TABLE `doctor_slots`
  ADD CONSTRAINT `doctor_slots_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
