// Author: Reagan Otema
// Database connection setup for CSE 340 Project

const { Pool } = require("pg")
require("dotenv").config()

// Render requires SSL. Local dev may not.
// This setup auto-detects environment.
const isProduction = process.env.NODE_ENV === "production"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: false } // Required for Render
    : false,
})

// Helpful wrapper for queries (recommended in CSE 340)
module.exports = {
  async query(text, params) {
    return pool.query(text, params)
  },
}
