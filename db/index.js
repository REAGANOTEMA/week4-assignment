// Author: Reagan Otema
// Database connection setup for CSE 340 Project

require("dotenv").config();
const { Pool } = require("pg");

// Detect Render environment
const isProduction = process.env.RENDER === "true" || process.env.NODE_ENV === "production";

// Create the connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: false }  // Render requires SSL
    : false                           // Local development (no SSL)
});

// Events for debugging
pool.on("connect", () => {
  console.log("✅ Database connected successfully");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected DB error:", err);
});

module.exports = pool;
