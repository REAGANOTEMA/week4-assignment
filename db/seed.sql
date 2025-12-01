-- Author: Reagan Otema
-- CSE 340 Correct Database Schema and Seed Data

-- ============================
-- DROP TABLES (order matters)
-- ============================
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS classification;

-- ============================
-- CREATE classification TABLE
-- ============================
CREATE TABLE classification (
  classification_id SERIAL PRIMARY KEY,
  classification_name VARCHAR(50) UNIQUE NOT NULL
);

-- ============================
-- CREATE inventory TABLE
-- ============================
CREATE TABLE inventory (
  inv_id SERIAL PRIMARY KEY,
  inv_make VARCHAR(50) NOT NULL,
  inv_model VARCHAR(50) NOT NULL,
  inv_year INT NOT NULL,
  inv_description TEXT NOT NULL,
  inv_image VARCHAR(200) NOT NULL,
  inv_thumbnail VARCHAR(200) NOT NULL,
  inv_price NUMERIC NOT NULL,
  inv_stock INT NOT NULL,
  inv_color VARCHAR(30) NOT NULL,
  classification_id INT NOT NULL REFERENCES classification(classification_id)
);

-- ==================================
-- SEED CLASSIFICATIONS
-- ==================================
INSERT INTO classification (classification_name)
VALUES
  ('SUV'),
  ('Truck'),
  ('Van'),
  ('Luxury'),
  ('Sports');

-- ==================================
-- SEED INVENTORY 
-- Matches /public/images/vehicles/*
-- ==================================
INSERT INTO inventory 
  (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail,
   inv_price, inv_stock, inv_color, classification_id)
VALUES
  ('Hummer', 'H2', 2020,
   'Bold SUV with off-road capability and luxury features.',
   '/images/vehicles/hummer.jpg',
   '/images/vehicles/hummer-tn.jpg',
   55000, 5, 'Black', 1),

  ('Mercedes', 'Sprinter Van', 2022,
   'Spacious and versatile van suitable for cargo or passengers.',
   '/images/vehicles/survan.jpg',
   '/images/vehicles/survan-tn.jpg',
   42000, 4, 'White', 3),

  ('Jeep', 'Wrangler', 2021,
   'Rugged 4x4 SUV built for adventure and off-road fun.',
   '/images/vehicles/wrangler.jpg',
   '/images/vehicles/wrangler-tn.jpg',
   38000, 7, 'Red', 1),

  ('Pierce', 'Fire Truck', 2019,
   'Fully equipped emergency fire truck ready for action.',
   '/images/vehicles/fire-truck.jpg',
   '/images/vehicles/fire-truck-tn.jpg',
   150000, 2, 'Yellow', 2),

  ('Subaru', 'Outback Dog Edition', 2023,
   'Pet-friendly vehicle with extra cargo room and comfort.',
   '/images/vehicles/dog-car.jpg',
   '/images/vehicles/dog-car-tn.jpg',
   32000, 6, 'Blue', 1);
