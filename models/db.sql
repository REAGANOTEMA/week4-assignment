-- Author: Reagan Otema
-- PostgreSQL database schema for CSE 340

-- ============================
-- DROP TABLES IF THEY EXIST
-- ============================
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS classification;

-- ============================
-- CREATE CLASSIFICATION TABLE
-- ============================
CREATE TABLE
IF NOT EXISTS classification
(
  classification_id SERIAL PRIMARY KEY,
  classification_name VARCHAR
(100) NOT NULL UNIQUE
);

-- ============================
-- CREATE INVENTORY TABLE
-- ============================
CREATE TABLE
IF NOT EXISTS inventory
(
  inv_id SERIAL PRIMARY KEY,
  inv_make VARCHAR
(100) NOT NULL,
  inv_model VARCHAR
(100) NOT NULL,
  inv_description TEXT NOT NULL,
  inv_image TEXT NOT NULL,
  inv_thumbnail TEXT NOT NULL,
  inv_price NUMERIC
(12,2) NOT NULL,
  inv_miles INTEGER NOT NULL,
  inv_color VARCHAR
(50) NOT NULL,
  classification_id INTEGER NOT NULL REFERENCES classification
(classification_id)
);
