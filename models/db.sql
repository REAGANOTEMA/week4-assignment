// Postgres database pool
//
Author:
Reagan Otema

const { Pool } = require
('pg');

//
Use DATABASE_URL
from environment
(Render) or fallback to local database
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost/reagan_assignment';

//
Create a new pool
const pool = new Pool
({ connectionString });

// Export query function and pool
module.exports = {
query:
(text, params) => pool.query
(text, params),
  pool
};
