// Inventory routes
// Author: Reagan Otema
const express = require('express');
const router = express.Router();
const invController = require('../controllers/inventorycontroller');
const validators = require('../middleware/validators');

// Management view (access via /inv/)
router.get('/', invController.buildManagement);

// Add classification
router.get('/add-classification', invController.buildAddClassification);
router.post('/add-classification', validators.validateClassification, invController.handleAddClassification);

// Add inventory
router.get('/add-inventory', invController.buildAddInventory);
router.post('/add-inventory', validators.validateInventory, invController.handleAddInventory);

module.exports = router;
