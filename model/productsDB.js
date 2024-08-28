import { pool } from '../config/config.js'

const getProductsDB = async () => {
  try {
    let [data] = await pool.query(`
      SELECT * FROM products
    `);
    return data;
  } catch (error) {
    console.error('Error retrieving products:', error);
    throw error;
  }
};

const getProductDB = async (id) => {
  try {
    let [[data]] = await pool.query(`
      SELECT * FROM products
      WHERE prodID = ?
    `, [id]);
    return data;
  } catch (error) {
    console.error('Error retrieving products:', error);
    throw error;
  }
};


export { getProductsDB, getProductDB }
