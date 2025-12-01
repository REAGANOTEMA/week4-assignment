// Author: Reagan Otema
// Inventory routes for CSE 340 Assignment 4

const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const { classificationValidator, vehicleValidator } = require("../middleware/validation");
const utilities = require("../utils/index");

/* ****************************************
 * Management View
 **************************************** */
router.get("/", inventoryController.getManagement);

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
  inventoryController.addVehicle // must exactly match controller
);

module.exports = router;
