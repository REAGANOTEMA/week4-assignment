/**
 * Author: Reagan Otema
 * Model functions for vehicles table
 */

// models/classificationModel.js
const pool = require('./index'); // adapt to your DB connection file

async function getClassifications() {
  const sql = 'SELECT classification_id, classification_name FROM public.classification ORDER BY classification_name';
  const data = await pool.query(sql);
  return data.rows;
}

async function addClassification(classification_name) {
  const sql = `INSERT INTO public.classification (classification_name)
               VALUES ($1)`;
  const values = [classification_name];
  const result = await pool.query(sql, values);
  return result;
}

module.exports = {
  getClassifications,
  addClassification
};
