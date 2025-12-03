// Author: Reagan Otema
// Database connection setup for CSE 340 Project

const { Pool } = require("pg")
require("dotenv").config()

const isProduction = process.env.NODE_ENV === "production"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
})

pool.on("connect", () => {
  console.log("Database connected successfully")
})

pool.on("error", (err) => {
  console.error("Unexpected DB error:", err)
})

module.exports = pool
