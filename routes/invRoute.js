// Inventory routes
// Author: Reagan Otema
// routes/invRoute.js
const express = require('express');
const router = new express.Router();
const invController = require('../controllers/invController');

// Inventory / classification routes
router.get('/', invController.buildInventory);
router.get('/add-classification', invController.addClassificationView);
router.post('/add-classification', invController.processAddClassification);

router.get('/add-vehicle', invController.addVehicleView);
router.post('/add-vehicle', invController.processAddVehicle);

// other inv routes should already exist (e.g., /inv/:id)
module.exports = router;
