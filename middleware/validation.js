// Author: Reagan Otema
const { body } = require('express-validator');

exports.classificationValidator = [
    body('classification_name')
        .trim()
        .notEmpty().withMessage('Classification name is required.')
        .matches(/^[A-Za-z0-9]+$/).withMessage('No spaces or special characters allowed.')
];

exports.vehicleValidator = [
    body('classification_id').notEmpty().withMessage('Classification is required.'),
    body('inv_make').trim().notEmpty().withMessage('Make is required.'),
    body('inv_model').trim().notEmpty().withMessage('Model is required.'),
    body('inv_description').trim().notEmpty().withMessage('Description is required.'),
    body('inv_price').isFloat({ gt: 0 }).withMessage('Price must be a positive number.'),
    body('inv_stock').isInt({ gt: -1 }).withMessage('Stock must be a positive integer.'),
    body('inv_color').trim().notEmpty().withMessage('Color is required.')
];
