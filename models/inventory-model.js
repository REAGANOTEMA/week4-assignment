// Inventory model - DB functions
// Author: Reagan Otema
const db = require("./db");

async function getClassifications() {
  return db.query(
    "SELECT classification_id, classification_name FROM classifications ORDER BY classification_name"
  );
}

async function insertClassification(classification_name) {
  const sql =
    "INSERT INTO classifications (classification_name) VALUES ($1) RETURNING classification_id";
  return db.query(sql, [classification_name]);
}

async function insertInventory(data) {
  const sql = `INSERT INTO inventory
    (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING inv_id`;
  const params = [
    data.classification_id,
    data.inv_make,
    data.inv_model,
    data.inv_year,
    data.inv_description,
    data.inv_image,
    data.inv_thumbnail,
    data.inv_price,
    data.inv_miles,
    data.inv_color,
  ];
  return db.query(sql, params);
}

module.exports = {
  getClassifications,
  insertClassification,
  insertInventory,
};
