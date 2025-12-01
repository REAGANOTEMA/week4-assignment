/**
 * Author: Reagan Otema
 * Model functions for classification table
 */

const pool = require("../db/index") // Use your db connection file

/**
 * Get all classifications
 * @returns Array of classification objects { classification_id, classification_name }
 */
async function getClassifications() {
  try {
    const sql = `
      SELECT classification_id, classification_name
      FROM public.classification
      ORDER BY classification_name
    `
    const data = await pool.query(sql)
    return data.rows
  } catch (error) {
    console.error("Error in getClassifications:", error)
    throw error
  }
}

/**
 * Insert a new classification
 * @param {string} classification_name
 * @returns Query result object
 */
async function insertClassification(classification_name) {
  try {
    const sql = `
      INSERT INTO public.classification (classification_name)
      VALUES ($1)
      RETURNING classification_id
    `
    const values = [classification_name]
    const result = await pool.query(sql, values)
    return result
  } catch (error) {
    console.error("Error in insertClassification:", error)
    throw error
  }
}

module.exports = {
  getClassifications,
  insertClassification,
}
