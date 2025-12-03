// Author: Reagan Otema
// Inventory routes for CSE 340 Assignment 4

const express = require("express");
const router = express.Router();

// Use lowercase to match the actual filename on disk
const inventoryController = require("../controllers/inventorycontroller"); // inventorycontroller.js
const { classificationValidator, vehicleValidator } = require("../middleware/validation");
const utilities = require("../utils/index");

/* ****************************************
 * Management View
 **************************************** */
router.get("/", inventoryController.buildManagement);

/* ****************************************
 * Add Classification Form
 **************************************** */
router.get("/add-classification", inventoryController.addClassificationView);

/* ****************************************
 * Add Classification Submission
 **************************************** */
router.post(
  "/add-classification",
  classificationValidator,
  inventoryController.addClassification
);

/* ****************************************
 * Add Vehicle Form
 **************************************** */
router.get("/add-inventory", inventoryController.addInventoryView);

/* ****************************************
 * Add Vehicle Submission
 **************************************** */
router.post(
  "/add-inventory",
  vehicleValidator,
  inventoryController.addInventory
);

/* ****************************************
 * Safety checks: Ensure controller functions exist
 **************************************** */
[
  "buildManagement",
  "addClassificationView",
  "addClassification",
  "addInventoryView",
  "addInventory"
].forEach(fn => {
  if (typeof inventoryController[fn] !== "function") {
    throw new Error(`inventoryController.${fn} is missing or not a function!`);
  }
});

module.exports = router;
