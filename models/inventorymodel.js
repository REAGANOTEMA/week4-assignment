// models/inventoryModel.js
const pool = require('./index'); // adapt to your DB connection file

async function addVehicle(vehicle) {
  const sql = `INSERT INTO public.inventory 
    (inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
  const values = [
    vehicle.inv_make,
    vehicle.inv_model,
    vehicle.inv_description || '',
    vehicle.inv_image || '/images/no-image.png',
    vehicle.inv_thumbnail || '/images/no-image-thumb.png',
    vehicle.inv_price,
    vehicle.inv_miles || 0,
    vehicle.inv_color || '',
    vehicle.classification_id
  ];
  const result = await pool.query(sql, values);
  return result;
}

module.exports = {
  addVehicle,
  // export other existing inventory functions if any
};
