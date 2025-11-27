// Author: Reagan Otema
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { classificationValidator, vehicleValidator } = require('../middleware/validation');

// Management View
router.get('/', inventoryController.getManagement);

// Add Classification Form
router.get('/add-classification', (req, res) => {
    res.render('inventory/add-classification', { errors: null, classification_name: '' });
});

// Add Classification Submission
router.post(
    '/add-classification',
    classificationValidator,
    inventoryController.addClassification
);

// Add Vehicle Form
router.get('/add-inventory', async (req, res) => {
    const classificationList = await require('../utils').buildClassificationList();
    res.render('inventory/add-inventory', {
        errors: null,
        classificationList,
        inv_make: '',
        inv_model: '',
        inv_description: '',
        inv_image: '/images/no-image.webp',
        inv_thumbnail: '/images/no-image-tn.webp',
        inv_price: '',
        inv_stock: '',
        inv_color: ''
    });
});

// Add Vehicle Submission
router.post(
    '/add-inventory',
    vehicleValidator,
    inventoryController.addVehicle
);

module.exports = router;
