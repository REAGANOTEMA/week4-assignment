// Author: Reagan Otema
// Inventory routes for CSE 340 Assignment 4

const express = require("express");
const router = express.Router();

// Use lowercase to match the actual filename on disk!
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
router.get("/add-classification", (req, res) => {
  res.render("inventory/add-classification", {
    errors: null,
    classification_name: ""
  });
});

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
router.get("/add-inventory", async (req, res) => {
  try {
    const classificationList = await utilities.buildClassificationList();
    res.render("inventory/add-inventory", {
      errors: null,
      classificationList,

      // Sticky defaults
      classification_id: "",
      inv_make: "",
      inv_model: "",
      inv_year: "",
      inv_description: "",
      inv_image: "/images/vehicles/no-image.png",
      inv_thumbnail: "/images/vehicles/no-image-tn.png",
      inv_price: "",
      inv_stock: "",
      inv_color: "",
    });
  } catch (error) {
    console.error("Error loading Add Inventory form:", error);
    res.status(500).send("Server Error");
  }
});

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
["buildManagement", "addClassification", "addInventory"].forEach(fn => {
  if (typeof inventoryController[fn] !== "function") {
    throw new Error(`inventoryController.${fn} is missing or not a function!`);
  }
});

module.exports = router;
