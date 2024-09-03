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

const addProductDB = async () => {
  try {
    let [data] = await pool.query(`
      INSERT INTO products (prodName, prodDescription, prodPrice, prodImage)
      VALUES (?, ?, ?, ?)
      `, [prodName, prodDescription, prodPrice, prodImage]);
      return data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
}

export { getProductsDB, getProductDB, addProductDB }
