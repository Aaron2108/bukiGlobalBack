CREATE DATABASE IF NOT EXISTS buki_db;
USE buki_db;

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration INT NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(150) NOT NULL,
  client_email VARCHAR(150) NOT NULL,
  service_id INT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  FOREIGN KEY (service_id) REFERENCES services(id)
);
