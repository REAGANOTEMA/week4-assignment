// Author: Reagan Otema
const pool = require('../db');

exports.insertClassification = async (classification_name) => {
    const sql = 'INSERT INTO classification (classification_name) VALUES ($1)';
    return await pool.query(sql, [classification_name]);
};

exports.insertVehicle = async ({ classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_stock, inv_color }) => {
    const sql = `INSERT INTO inventory 
        (classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_stock, inv_color) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
    return await pool.query(sql, [classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_stock, inv_color]);
};

exports.getClassifications = async () => {
    const sql = 'SELECT * FROM classification ORDER BY classification_name';
    return await pool.query(sql);
};
