import { pool } from "../config/config.js";

const getBestSellersDB = async () => {
  try {
    let [data] = await pool.query(`
      SELECT * FROM bestSellers
    `);
    return data;
  } catch (error) {
    console.error('Error retrieving best sellers:', error);
    throw error;
  }
};

const getBestSellerDB = async (id) => {
  try {
    let [[data]] = await pool.query(`
      SELECT * FROM bestSellers
      WHERE bestSellerID = ?
    `, [id]);
    return data;
  } catch (error) {
    console.error('Error retrieving best seller:', error);
    throw error;
  }
};

export { getBestSellersDB, getBestSellerDB }