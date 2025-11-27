/**
 * Author: Reagan Otema
 * Controller for vehicle pages and error handling
 */
// controllers/invController.js
const classificationModel = require('../models/classificationModel');
const inventoryModel = require('../models/inventoryModel');
const utilities = require('../utilities/utilities'); // adapt if you use different utilities
// render the inventory home / list (existing function)
async function buildInventory(req, res, next) {
  try {
    const classifications = await classificationModel.getClassifications();
    // existing code likely builds nav and renders - adapt if necessary
    res.render('inventory/list', { classifications });
  } catch (err) {
    next(err);
  }
}

// Add classification GET view
function addClassificationView(req, res) {
  res.render('inventory/add-classification', {
    title: 'Add Classification',
    errors: null,
    data: {}
  });
}

// Add classification POST handler
async function processAddClassification(req, res, next) {
  try {
    const { classification_name } = req.body;
    // basic server-side validation
    if (!classification_name || classification_name.trim().length < 2) {
      return res.render('inventory/add-classification', {
        title: 'Add Classification',
        errors: ['Classification name must be at least 2 characters.'],
        data: { classification_name }
      });
    }

    const result = await classificationModel.addClassification(classification_name.trim());
    if (result.rowCount && result.rowCount > 0) {
      // success - redirect to inventory root or show success message
      req.flash('success', `Classification "${classification_name}" added.`);
      return res.redirect('/inv'); // nav should refresh to show new classification
    } else {
      return res.render('inventory/add-classification', {
        title: 'Add Classification',
        errors: ['Failed to add classification. Try again.'],
        data: { classification_name }
      });
    }
  } catch (err) {
    next(err);
  }
}

// Add vehicle GET view
async function addVehicleView(req, res, next) {
  try {
    const classifications = await classificationModel.getClassifications();
    res.render('inventory/add-vehicle', {
      title: 'Add Vehicle',
      classifications,
      errors: null,
      data: {}
    });
  } catch (err) {
    next(err);
  }
}

// Add vehicle POST handler
async function processAddVehicle(req, res, next) {
  try {
    const {
      inv_make, inv_model, inv_description,
      inv_image, inv_thumbnail, inv_price,
      inv_miles, inv_color, classification_id
    } = req.body;

    // basic validation
    const errors = [];
    if (!inv_make || !inv_model) errors.push('Make and model are required.');
    if (!classification_id) errors.push('Classification must be selected.');
    if (!inv_price || isNaN(Number(inv_price))) errors.push('Price is required and must be a number.');

    if (errors.length > 0) {
      const classifications = await classificationModel.getClassifications();
      return res.render('inventory/add-vehicle', {
        title: 'Add Vehicle',
        classifications,
        errors,
        data: req.body
      });
    }

    const result = await inventoryModel.addVehicle({
      inv_make, inv_model, inv_description,
      inv_image, inv_thumbnail, inv_price,
      inv_miles, inv_color, classification_id
    });

    if (result.rowCount && result.rowCount > 0) {
      req.flash('success', `Vehicle ${inv_make} ${inv_model} added.`);
      return res.redirect('/inv');
    } else {
      const classifications = await classificationModel.getClassifications();
      return res.render('inventory/add-vehicle', {
        title: 'Add Vehicle',
        classifications,
        errors: ['Failed to add vehicle. Try again.'],
        data: req.body
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  buildInventory,
  addClassificationView,
  processAddClassification,
  addVehicleView,
  processAddVehicle,
  // export other existing functions if present
};
