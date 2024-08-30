import { pool } from "../config/config.js";

const getBestSellersDB = async () => {
  try {
    let [data] = await pool.query(`
      SELECT * FROM bestSellers
    `);
    return data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};

export { getBestSellersDB }