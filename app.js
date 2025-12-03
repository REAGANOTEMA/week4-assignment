// Author: Reagan Otema
/*
  Final working server for CSE 340 Week 4 assignment
*/

const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash'); // Added for flash messages
const helmet = require('helmet'); // optional security
const morgan = require('morgan'); // optional logging
require('dotenv').config();

const app = express();

// Optional: security headers
app.use(helmet());

// Optional: logging
app.use(morgan('dev'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware for flash messages
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to true if using HTTPS
  })
);

// Initialize flash messages
app.use(flash());

// Database connection (example for MySQL2)
const mysql = require('mysql2/promise');
let db;

(async function initDB() {
  try {
    db = await mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'week4_assignment',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // stop app if DB fails
  }
})();

// Make db accessible in req
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const inventoryRoutes = require('./routes/inventoryroute'); // lowercase
app.use('/inv', inventoryRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Reagan Otema — CSE 340 Assignment Server Running');
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
