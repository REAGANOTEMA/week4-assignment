/**
 * Author: Reagan Otema
 * Vehicle Detail Page - MVC App (Render-ready)
 */

require('dotenv').config();
const express = require('express');
const app = express();
const { Pool } = require('pg');
const path = require('path');

// Correct lowercase path to match your actual file
const inventoryRoutes = require('./routes/inventoryroutes');

// Setup PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Make database pool available to controllers
app.locals.db = pool;

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/inventory', inventoryRoutes);
app.get('/', (req, res) => {
  res.redirect('/inventory');
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', { 
    message: 'Page not found', 
    status: 404 
  });
});

// 500 error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', { 
    message: err.message, 
    status: 500 
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
