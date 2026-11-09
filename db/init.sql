-- Table for cars and their main specs
CREATE TABLE cars (
  id SERIAL PRIMARY KEY,
  brand VARCHAR(50) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  engine VARCHAR(100),
  horsepower INT,
  torque_nm INT,
  zero_to_100 DECIMAL(4, 1),
  weight_kg INT,
  image_url TEXT
);

-- Sample data (we will add all 50 cars later)
INSERT INTO cars (brand, model, year, engine, horsepower, torque_nm, zero_to_100, weight_kg) VALUES
('BMW', 'M3 E30', 1988, '2.3L I4 (S14)', 195, 230, 6.7, 1200),
('Toyota', 'Supra MK4', 1993, '3.0L Twin-Turbo I6 (2JZ-GTE)', 320, 427, 4.9, 1570),
('Nissan', 'Skyline GT-R R34', 1999, '2.6L Twin-Turbo I6 (RB26DETT)', 280, 392, 4.9, 1560);

-- Spare parts, each part belongs to one car
CREATE TABLE parts (
  id SERIAL PRIMARY KEY,
  car_id INT NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  part_number VARCHAR(50) NOT NULL
);

-- Example part numbers, replace with real OEM numbers when collecting data
INSERT INTO parts (car_id, name, category, part_number) VALUES
(1, 'Oil Filter', 'Engine', 'E30M3-OF-001'),
(1, 'Spark Plug', 'Ignition', 'E30M3-SP-002'),
(1, 'Front Brake Pads', 'Brakes', 'E30M3-BP-003'),
(2, 'Oil Filter', 'Engine', 'SUPRA-OF-001'),
(2, 'Spark Plug', 'Ignition', 'SUPRA-SP-002'),
(2, 'Front Brake Pads', 'Brakes', 'SUPRA-BP-003'),
(3, 'Oil Filter', 'Engine', 'R34-OF-001'),
(3, 'Spark Plug', 'Ignition', 'R34-SP-002'),
(3, 'Front Brake Pads', 'Brakes', 'R34-BP-003');