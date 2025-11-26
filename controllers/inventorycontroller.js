// Inventory controller
// Author: Reagan Otema
const invModel = require('../models/inventory-model');
const util = require('../utilities');

async function buildManagement(req, res, next) {
  try {
    // build classification list to show in management immediately after adds
    const classifications = await invModel.getClassifications();
    res.render('inventory/management', { classifications: classifications.rows, message: req.flash('message') });
  } catch (err) {
    next(err);
  }
}

function buildAddClassification(req, res, next) {
  try {
    res.render('inventory/add-classification', { errors: req.flash('errors') || [], classification_name: '' });
  } catch (err) {
    next(err);
  }
}

async function handleAddClassification(req, res, next) {
  try {
    const classification_name = req.body.classification_name.trim();
    const result = await invModel.insertClassification(classification_name);
    if (result && result.rows && result.rows[0]) {
      req.flash('message', `Classification "${classification_name}" added successfully.`);
      return res.redirect('/inv/');
    } else {
      req.flash('errors', ['Failed to add classification.']);
      return res.render('inventory/add-classification', { errors: req.flash('errors'), classification_name });
    }
  } catch (err) {
    // handle unique constraint
    if (err.code === '23505') {
      req.flash('errors', ['Classification already exists.']);
      return res.render('inventory/add-classification', { errors: req.flash('errors'), classification_name: req.body.classification_name });
    }
    next(err);
  }
}

async function buildAddInventory(req, res, next) {
  try {
    const classificationList = await util.buildClassificationList();
    res.render('inventory/add-inventory', { errors: req.flash('errors') || [], sticky: {}, classificationList });
  } catch (err) {
    next(err);
  }
}

async function handleAddInventory(req, res, next) {
  try {
    const data = {
      classification_id: req.body.classification_id,
      inv_make: req.body.inv_make.trim(),
      inv_model: req.body.inv_model.trim(),
      inv_year: Number(req.body.inv_year),
      inv_description: req.body.inv_description || '',
      inv_image: req.body.inv_image || '/images/no-image.png',
      inv_thumbnail: req.body.inv_thumbnail || '/images/no-image-thumb.png',
      inv_price: Number(req.body.inv_price),
      inv_miles: Number(req.body.inv_miles),
      inv_color: req.body.inv_color || ''
    };
    const result = await invModel.insertInventory(data);
    if (result && result.rows && result.rows[0]) {
      req.flash('message', `Vehicle added successfully (ID: ${result.rows[0].inv_id}).`);
      return res.redirect('/inv/');
    } else {
      req.flash('errors', ['Failed to add vehicle.']);
      const classificationList = await util.buildClassificationList(req.body.classification_id);
      return res.render('inventory/add-inventory', { errors: req.flash('errors'), sticky: req.body, classificationList });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  buildManagement,
  buildAddClassification,
  handleAddClassification,
  buildAddInventory,
  handleAddInventory
};
