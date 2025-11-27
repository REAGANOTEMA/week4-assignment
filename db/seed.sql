-- Author: Reagan Otema
-- Seed data for vehicles table

DROP TABLE IF EXISTS vehicles;

CREATE TABLE vehicles
(
  id SERIAL PRIMARY KEY,
  make VARCHAR(50),
  model VARCHAR(50),
  year INT,
  price NUMERIC,
  mileage INT,
  image VARCHAR(100),
  description TEXT
);

-- Insert vehicles using local images from /public/images/vehicles/
INSERT INTO vehicles
  (make, model, year, price, mileage, image, description)
VALUES
  ('Hummer', 'H2', 2020, 55000, 20000, 'hummer.jpg', 'Bold SUV with off-road capability and luxury features.'),
  ('Mercedes', 'Sprinter Van', 2022, 42000, 15000, 'survan.jpg', 'Spacious and versatile van suitable for cargo or passengers.'),
  ('Jeep', 'Wrangler', 2021, 38000, 12000, 'wrangler.jpg', 'Rugged 4x4 SUV built for adventure and off-road fun.'),
  ('Fire Truck', 'Pierce Arrow', 2019, 150000, 8000, 'fire-truck.jpg', 'Fully equipped emergency fire truck ready for action.'),
  ('Dog Car', 'Subaru Outback', 2023, 32000, 5000, 'dog-car.jpg', 'Pet-friendly vehicle with plenty of cargo space and comfort.');
