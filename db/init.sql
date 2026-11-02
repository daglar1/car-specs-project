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