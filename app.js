// Author: Reagan Otema
const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static('public'));

// Routes
const inventoryRoutes = require('./routes/inventoryRoutes');
app.use('/inventory', inventoryRoutes);

// Root
app.get('/', (req, res) => res.send('Server running - Reagan Otema'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));
