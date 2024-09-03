import { pool } from '../config/config.js'

const getProductsDB = async () => {
  try {
    let [data] = await pool.query(`
      SELECT * FROM products
    `);
    return data;
  } catch (error) {
    console.error('Error retrieving products:', error);
    throw new Error(`Failed to retrieve products: ${error.message}`);
  }
};

const getProductDB = async (id) => {
  try {
    let [[data]] = await pool.query(`
      SELECT * FROM products
      WHERE prodID = ?
    `, [id]);
    if (!data) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return data;
  } catch (error) {
    console.error('Error retrieving products:', error);
    throw new Error(`Failed to retrieve product with ID ${id}: ${error.message}`);
  }
};

const addProductDB = async (prodName, price, quantity, category, prodUrl, prodDesc, prodInfo) => {
  if (!prodName || !price || !quantity || !category || !prodUrl || !prodDesc || !prodInfo) {
    throw new Error('All product fields are required');
  }
  try {
    const [data] = await pool.query(`
      INSERT INTO products (prodName, price, quantity, category, prodUrl, prodDesc, prodInfo)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [prodName, price, quantity, category, prodUrl, prodDesc, prodInfo]);
    return data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw new Error(`Failed to add product: ${error.message}`);
  }
};

const deleteProductDB = async (id) => {
  if (!id) {
    throw new Error('Product ID is required');
  }
  try {
    await pool.query(`
      DELETE FROM products
      WHERE prodID = ?
      `, [id]);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error(`Failed to delete product with ID ${id}: ${error.message}`);
  }
};

const updateProductDB = async (prodName, price, quantity, category, prodUrl, prodDesc, prodInfo, id) => {
  if (!id) {
    throw new Error('Product ID is required');
  }
  if (!prodName || !price || !quantity || !category || !prodUrl || !prodDesc || !prodInfo) {
    throw new Error('All product fields are required');
  }
  try {
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
      `, [prodName, price, quantity, category, prodUrl, prodDesc, prodInfo, id]);
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error(`Failed to update product with ID ${id}: ${error.message}`);
  }
};

export { getProductsDB, getProductDB, addProductDB, deleteProductDB, updateProductDB }
