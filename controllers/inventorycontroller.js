// controllers/inventorycontroller.js
// Author: Reagan Otema

const invModel = require("../models/inventorymodel") // match your lowercase filename
const { validationResult } = require("express-validator")
const utilities = require("../utils/index")

/* ****************************************
*  Deliver Inventory Management View
**************************************** */
exports.getManagement = async function (req, res) {
  const nav = await utilities.getNav()
  const message = req.flash("notice")
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    errors: null,
    message,
  })
}

/* ****************************************
*  Deliver Add Classification View
**************************************** */
exports.addClassificationView = async function (req, res) {
  const nav = await utilities.getNav()
  const message = req.flash("notice")

  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    message,
    errors: null,
    classification_name: "",
  })
}

/* ****************************************
*  Process Add Classification
**************************************** */
exports.addClassification = async function (req, res) {
  const errors = validationResult(req)
  let { classification_name } = req.body
  const nav = await utilities.getNav()

  if (!errors.isEmpty()) {
    return res.status(400).render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: errors.array(),
      message: null,
      classification_name,
    })
  }

  try {
    const result = await invModel.insertClassification(classification_name)

    if (result.rowCount > 0) {
      req.flash("notice", `The classification "${classification_name}" was successfully added.`)
      return res.redirect("/inv/")
    }

    return res.status(500).render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: [{ msg: "Failed to add classification." }],
      message: null,
      classification_name,
    })
  } catch (error) {
    return res.status(500).render("inventory/add-classification", {
      title: "Add New Classification",
      nav,
      errors: [{ msg: error.message }],
      message: null,
      classification_name,
    })
  }
}

/* ****************************************
*  Deliver Add Inventory View
**************************************** */
exports.addInventoryView = async function (req, res) {
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()
  const message = req.flash("notice")

  res.render("inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    classificationList,
    errors: null,
    message,
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
  })
}

/* ****************************************
*  Process Add Vehicle
**************************************** */
exports.addVehicle = async function (req, res) {
  const errors = validationResult(req)
  const nav = await utilities.getNav()
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_stock,
    inv_color,
  } = req.body

  const classificationList = await utilities.buildClassificationList(classification_id)

  if (!errors.isEmpty()) {
    return res.status(400).render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationList,
      errors: errors.array(),
      message: null,
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_stock,
      inv_color,
    })
  }

  try {
    const result = await invModel.insertVehicle({
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_stock,
      inv_color,
    })

    if (result.rowCount > 0) {
      req.flash("notice", `The vehicle "${inv_make} ${inv_model}" was successfully added.`)
      return res.redirect("/inv/")
    }

    return res.status(500).render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationList,
      errors: [{ msg: "Failed to add vehicle." }],
      message: null,
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_stock,
      inv_color,
    })
  } catch (error) {
    return res.status(500).render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      classificationList,
      errors: [{ msg: error.message }],
      message: null,
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_stock,
      inv_color,
    })
  }
}
