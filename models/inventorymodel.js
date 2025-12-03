// Author: Reagan Otema
// Model functions for inventory and classification

const pool = require("../db/index");

/**
 * Insert a new classification
 * @param {string} classification_name
 * @returns query result
 */
exports.insertClassification = async (classification_name) => {
  try {
    const sql = `
      INSERT INTO classification (classification_name)
      VALUES ($1)
      RETURNING classification_id
    `;
    const result = await pool.query(sql, [classification_name]);
    return result;
  } catch (error) {
    console.error("Error in insertClassification:", error);
    throw error;
  }
};

/**
 * Insert a new vehicle into inventory
 * @param {Object} vehicle
 * @returns query result
 */
exports.insertVehicle = async ({
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
}) => {
  try {
    const sql = `
      INSERT INTO inventory
      (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_stock, inv_color)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING inv_id
    `;
    const values = [
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
    ];
    const result = await pool.query(sql, values);
    return result;
  } catch (error) {
    console.error("Error in insertVehicle:", error);
    throw error;
  }
};

/**
 * Get all classifications for dropdown
 * @returns Array of classification objects
 */
exports.getClassifications = async () => {
  try {
    const sql = `
      SELECT classification_id, classification_name
      FROM classification
      ORDER BY classification_name
    `;
    const result = await pool.query(sql);
    return result.rows;
  } catch (error) {
    console.error("Error in getClassifications:", error);
    throw error;
  }
};

/**
 * Get all inventory items joined with classification
 * @returns Array of inventory objects
 */
exports.getInventory = async () => {
  try {
    const sql = `
      SELECT i.*, c.classification_name
      FROM inventory i
      JOIN classification c ON i.classification_id = c.classification_id
      ORDER BY i.inv_make, i.inv_model
    `;
    const result = await pool.query(sql);
    return result.rows;
  } catch (error) {
    console.error("Error in getInventory:", error);
    throw error;
  }
};
