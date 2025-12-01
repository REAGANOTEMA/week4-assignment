// Author: Reagan Otema
const { body } = require("express-validator")

/*
  CLASSIFICATION VALIDATION
  --------------------------
  CSE 340 requires classification names to use:
  - letters
  - numbers
  - spaces
  No symbols allowed.
*/
exports.classificationValidator = [
  body("classification_name")
    .trim()
    .notEmpty().withMessage("Classification name is required.")
    .matches(/^[A-Za-z0-9 ]+$/)
    .withMessage("Only letters, numbers, and spaces are allowed."),
]

/*
  VEHICLE VALIDATION
  --------------------
  Ensures all fields match the model + controller rules.
*/
exports.vehicleValidator = [
  body("classification_id")
    .notEmpty()
    .withMessage("Classification is required."),

  body("inv_make")
    .trim()
    .notEmpty()
    .withMessage("Vehicle make is required."),

  body("inv_model")
    .trim()
    .notEmpty()
    .withMessage("Vehicle model is required."),

  body("inv_description")
    .trim()
    .notEmpty()
    .withMessage("A vehicle description is required."),

  body("inv_image")
    .trim()
    .notEmpty()
    .withMessage("Vehicle image path is required."),

  body("inv_thumbnail")
    .trim()
    .notEmpty()
    .withMessage("Thumbnail image path is required."),

  body("inv_price")
    .notEmpty().withMessage("Price is required.")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number."),

  body("inv_stock")
    .notEmpty().withMessage("Stock count is required.")
    .isInt({ min: 0 })
    .withMessage("Stock must be 0 or a positive whole number."),

  body("inv_color")
    .trim()
    .notEmpty()
    .withMessage("Vehicle color is required."),
]
