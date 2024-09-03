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
      INSERT INTO products (prodName, price, quantity, category, prodUrl, prodDesc, prodInfo)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [prodName, price, quantity, category, prodUrl, prodDesc, prodInfo]);
    return data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

const deleteProductDB = async (id) => {
  await pool.query(`
    DELETE FROM products
    WHERE prodID = ?
    `, [id])
}

const updateProductDB = async (prodName, price, quantity, category, prodUrl, prodDesc, prodInfo, id) => {
  await pool.query(`
    UPDATE products
    SET prodName = ?,
    price = ?,
    quantity = ?,
    category = ?,
    prodUrl = ?,
    prodDesc = ?,
    prodInfo = ?
    WHERE prodID = ?
    `, [prodName, price, quantity, category, prodUrl, prodDesc, prodInfo, id])
}

export { getProductsDB, getProductDB, addProductDB, deleteProductDB, updateProductDB }
