/*
  Author: Reagan Otema
  Production-ready server for CSE 340 Week 4 assignment
*/

const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash"); // Flash messages
const helmet = require("helmet"); // Security headers
const morgan = require("morgan"); // HTTP logging
const mysql = require("mysql2/promise"); // MySQL database
require("dotenv").config();

const app = express();

// Security headers
app.use(helmet());

// HTTP request logging
app.use(morgan("dev"));

// Middleware for parsing body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Session middleware (MemoryStore for development; can switch to MySQL store for production)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // true in production
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Flash messages
app.use(flash());

// Make flash messages available in all views
app.use((req, res, next) => {
  res.locals.message = req.flash("notice");
  next();
});

// Database connection
let db;
(async function initDB() {
  try {
    db = await mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "week4_assignment",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Stop server if DB fails
  }
})();

// Make DB accessible in all requests
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const inventoryRoutes = require("./routes/inventoryroute"); // lowercase
app.use("/inv", inventoryRoutes);

// Redirect root "/" to inventory management page
app.get("/", (req, res) => {
  res.redirect("/inv/");
});

// 404 handler
app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", { title: "500 - Server Error", error: err });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
