// Author: Reagan Otema
const invModel = require('../models/inventoryModel');
const { validationResult } = require('express-validator');
const util = require('../utils');

exports.getManagement = (req, res) => {
    const message = req.session.message;
    req.session.message = null;
    res.render('inventory/management', { message });
};

exports.addClassification = async (req, res) => {
    const errors = validationResult(req);
    const { classification_name } = req.body;

    if (!errors.isEmpty()) {
        return res.render('inventory/add-classification', { errors: errors.array(), classification_name });
    }

    try {
        const result = await invModel.insertClassification(classification_name);
        if (result.rowCount > 0) {
            req.session.message = `Classification "${classification_name}" added successfully!`;
            return res.redirect('/inv/');
        } else {
            return res.render('inventory/add-classification', { errors: [{ msg: 'Failed to add classification.' }], classification_name });
        }
    } catch (err) {
        return res.render('inventory/add-classification', { errors: [{ msg: err.message }], classification_name });
    }
};

exports.addVehicle = async (req, res) => {
    const errors = validationResult(req);
    const {
        classification_id, inv_make, inv_model, inv_description,
        inv_image, inv_thumbnail, inv_price, inv_stock, inv_color
    } = req.body;

    if (!errors.isEmpty()) {
        const classificationList = await util.buildClassificationList(classification_id);
        return res.render('inventory/add-inventory', { errors: errors.array(), classificationList, ...req.body });
    }

    try {
        const result = await invModel.insertVehicle(req.body);
        if (result.rowCount > 0) {
            req.session.message = `Vehicle "${inv_make} ${inv_model}" added successfully!`;
            return res.redirect('/inv/');
        } else {
            const classificationList = await util.buildClassificationList(classification_id);
            return res.render('inventory/add-inventory', { errors: [{ msg: 'Failed to add vehicle.' }], classificationList, ...req.body });
        }
    } catch (err) {
        const classificationList = await util.buildClassificationList(classification_id);
        return res.render('inventory/add-inventory', { errors: [{ msg: err.message }], classificationList, ...req.body });
    }
};
