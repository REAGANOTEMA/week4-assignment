# Reagan Otema — CSE 340 Assignment 4

**Adding New Classifications and Vehicles**

**Author:** Reagan Otema

## Overview

This project provides an Express/EJS MVC sample that implements:

- Management view (`/inv/`)
- Add Classification (client+server validation)
- Add Inventory/Vehicle (client+server validation, sticky form)
- Flash messages, utilities, and parameterized DB inserts (Postgres)

## Setup

1. Copy `.env.sample` to `.env` and set `DATABASE_URL` and `SESSION_SECRET`.
2. `npm install`
3. Run locally: `npm run dev` or `npm start`

## Database

Create the required tables (example):

```sql
CREATE TABLE classifications (
  classification_id SERIAL PRIMARY KEY,
  classification_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE inventory (
  inv_id SERIAL PRIMARY KEY,
  classification_id INTEGER NOT NULL REFERENCES classifications(classification_id),
  inv_make VARCHAR(50) NOT NULL,
  inv_model VARCHAR(50) NOT NULL,
  inv_year INTEGER NOT NULL,
  inv_description TEXT,
  inv_image VARCHAR(255),
  inv_thumbnail VARCHAR(255),
  inv_price NUMERIC(12,2) NOT NULL,
  inv_miles INTEGER NOT NULL,
  inv_color VARCHAR(30)
);
```
