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
  
image_url TEXT,
  
views INT NOT NULL DEFAULT 0
);
-- 50 iconic cars from 1980 to 2010
-- Specs are approximate factory figures, check them before the final submission
INSERT INTO cars (brand, model, year, engine, horsepower, torque_nm, zero_to_100, weight_kg) VALUES
('BMW', 'M3 E30', 1988, '2.3L I4 (S14)', 195, 230, 6.7, 1200),
('Toyota', 'Supra MK4', 1993, '3.0L Twin-Turbo I6 (2JZ-GTE)', 320, 427, 4.9, 1570),
('Nissan', 'Skyline GT-R R34', 1999, '2.6L Twin-Turbo I6 (RB26DETT)', 280, 392, 4.9, 1560),
('Honda', 'NSX', 1990, '3.0L V6 (C30A)', 274, 285, 5.7, 1365),
('Mazda', 'RX-7 FD', 1992, '1.3L Twin-Turbo Rotary (13B-REW)', 255, 294, 5.3, 1280),
('Mitsubishi', 'Lancer Evolution VI', 1999, '2.0L Turbo I4 (4G63T)', 280, 373, 4.6, 1360),
('Subaru', 'Impreza WRX STi GC8', 1998, '2.0L Turbo Flat-4 (EJ20)', 280, 352, 4.7, 1270),
('Toyota', 'Sprinter Trueno AE86', 1983, '1.6L I4 (4A-GE)', 130, 149, 8.5, 940),
('Nissan', '300ZX Twin Turbo Z32', 1990, '3.0L Twin-Turbo V6 (VG30DETT)', 300, 383, 5.6, 1590),
('Porsche', '911 Carrera 964', 1989, '3.6L Flat-6', 250, 310, 5.7, 1350),
('Porsche', '911 Turbo 993', 1995, '3.6L Twin-Turbo Flat-6', 408, 540, 4.5, 1500),
('Porsche', '959', 1986, '2.85L Twin-Turbo Flat-6', 450, 500, 3.7, 1450),
('Ferrari', 'F40', 1987, '2.9L Twin-Turbo V8', 478, 577, 4.1, 1100),
('Ferrari', 'Testarossa', 1984, '4.9L Flat-12', 390, 490, 5.8, 1506),
('Ferrari', 'F355', 1994, '3.5L V8', 380, 363, 4.7, 1350),
('Ferrari', '360 Modena', 1999, '3.6L V8', 400, 373, 4.5, 1390),
('Lamborghini', 'Countach LP5000 QV', 1985, '5.2L V12', 455, 500, 4.9, 1490),
('Lamborghini', 'Diablo', 1990, '5.7L V12', 492, 580, 4.5, 1576),
('Lamborghini', 'Murcielago', 2001, '6.2L V12', 580, 650, 3.8, 1650),
('McLaren', 'F1', 1992, '6.1L V12 (BMW S70/2)', 627, 651, 3.2, 1138),
('Bugatti', 'EB110 GT', 1991, '3.5L Quad-Turbo V12', 553, 611, 3.5, 1618),
('Bugatti', 'Veyron 16.4', 2005, '8.0L Quad-Turbo W16', 1001, 1250, 2.5, 1888),
('Pagani', 'Zonda C12 S', 2002, '7.3L V12 (Mercedes-AMG)', 555, 750, 3.7, 1250),
('Mercedes-Benz', '190E 2.5-16 Evolution II', 1990, '2.5L I4', 235, 245, 7.1, 1340),
('Mercedes-Benz', 'SLR McLaren', 2003, '5.4L Supercharged V8', 626, 780, 3.8, 1768),
('BMW', 'M5 E39', 1998, '4.9L V8 (S62)', 400, 500, 5.3, 1795),
('BMW', 'M3 E46', 2000, '3.2L I6 (S54)', 343, 365, 5.2, 1495),
('BMW', 'Z8', 2000, '4.9L V8 (S62)', 400, 500, 4.7, 1585),
('Audi', 'Sport Quattro', 1984, '2.1L Turbo I5', 306, 350, 4.8, 1300),
('Audi', 'RS2 Avant', 1994, '2.2L Turbo I5', 315, 410, 5.4, 1595),
('Volkswagen', 'Golf GTI Mk2', 1984, '1.8L I4', 112, 157, 8.3, 920),
('Lancia', 'Delta HF Integrale Evoluzione', 1991, '2.0L Turbo I4', 210, 300, 5.7, 1340),
('Ford', 'Sierra RS Cosworth', 1986, '2.0L Turbo I4 (YB)', 204, 276, 6.2, 1220),
('Ford', 'Escort RS Cosworth', 1992, '2.0L Turbo I4 (YB)', 227, 304, 6.2, 1275),
('Ford', 'GT', 2005, '5.4L Supercharged V8', 550, 678, 3.8, 1520),
('Chevrolet', 'Corvette C4 ZR-1', 1990, '5.7L V8 (LT5)', 375, 502, 4.9, 1580),
('Chevrolet', 'Corvette C6 Z06', 2006, '7.0L V8 (LS7)', 505, 637, 3.9, 1420),
('Dodge', 'Viper RT/10', 1992, '8.0L V10', 400, 630, 4.6, 1490),
('Ford', 'Mustang SVT Cobra', 2003, '4.6L Supercharged V8', 390, 529, 4.9, 1620),
('Toyota', 'Celica GT-Four ST205', 1994, '2.0L Turbo I4 (3S-GTE)', 255, 304, 5.9, 1380),
('Honda', 'Integra Type R DC2', 1995, '1.8L I4 (B18C)', 200, 186, 6.7, 1100),
('Honda', 'S2000', 1999, '2.0L I4 (F20C)', 240, 208, 6.2, 1260),
('Honda', 'Civic Type R EK9', 1997, '1.6L I4 (B16B)', 185, 160, 6.7, 1070),
('Mazda', 'MX-5 Miata NA', 1989, '1.6L I4 (B6ZE)', 115, 136, 8.6, 960),
('Nissan', 'Silvia S15 Spec-R', 1999, '2.0L Turbo I4 (SR20DET)', 250, 275, 5.8, 1250),
('Lexus', 'LFA', 2010, '4.8L V10 (1LR-GUE)', 560, 480, 3.7, 1480),
('Nissan', 'GT-R R35', 2007, '3.8L Twin-Turbo V6 (VR38DETT)', 480, 588, 3.5, 1740),
('Porsche', 'Carrera GT', 2004, '5.7L V10', 612, 590, 3.9, 1380),
('Ferrari', 'Enzo', 2002, '6.0L V12', 651, 657, 3.7, 1365),
('DeLorean', 'DMC-12', 1981, '2.85L V6 (PRV)', 130, 207, 10.5, 1230);
-- Spare parts, each part belongs to one car
CREATE TABLE parts (
  
id SERIAL PRIMARY KEY,
  
car_id INT NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  
name VARCHAR(100) NOT NULL,
  
category VARCHAR(50) NOT NULL,
  
part_number VARCHAR(50) NOT NULL
);
-- Give every car the same set of common parts with example part numbers
-- Example: car 2 (Toyota) gets "TOY-2-OF" for its oil filter
-- Replace these with real OEM numbers when you collect them
INSERT INTO parts (car_id, name, category, part_number)
SELECT
  
c.id,
  
p.name,
  
p.category,
  
UPPER(LEFT(c.brand, 3)) || '-' || c.id || '-' || p.code
FROM cars c
CROSS JOIN (VALUES
  
('Oil Filter', 'Engine', 'OF'),
  
('Air Filter', 'Engine', 'AF'),
  
('Spark Plug', 'Ignition', 'SP'),
  
('Front Brake Pads', 'Brakes', 'FBP'),
  
('Rear Brake Pads', 'Brakes', 'RBP'),
  
('Front Brake Discs', 'Brakes', 'FBD')
) AS p(name, category, code);
