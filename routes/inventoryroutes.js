/**
 * Author: Reagan Otema
 * Inventory routes
 */

const express = require('express');
const router = express.Router();

// Controller
const inventoryController = require('../controllers/inventorycontroller');

// List all vehicles
router.get('/', inventoryController.inventoryList);

// Vehicle detail route
router.get('/vehicle/:id', inventoryController.vehicleDetail);

// Trigger 500 error route
router.get('/trigger-error', inventoryController.triggerError);

module.exports = router;
