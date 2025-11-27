// Postgres database pool
//
Author:
Reagan Otema

CREATE TABLE
IF NOT EXISTS classification
(
  classification_id SERIAL PRIMARY KEY,
  classification_name VARCHAR
(100) NOT NULL UNIQUE
);

CREATE TABLE
IF NOT EXISTS inventory
(
  inv_id SERIAL PRIMARY KEY,
  inv_make VARCHAR
(100) NOT NULL,
  inv_model VARCHAR
(100) NOT NULL,
  inv_description TEXT,
  inv_image TEXT,
  inv_thumbnail TEXT,
  inv_price NUMERIC
(12,2),
  inv_miles INTEGER,
  inv_color VARCHAR
(50),
  classification_id INTEGER REFERENCES classification
(classification_id)
);
