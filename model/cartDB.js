import { pool } from '../config/config.js'

const getCartsDB = async (userID) => {
  try {
    let [data] = await pool.query(`
      SELECT * FROM cart
			WHERE userID = ?
    `, [userID]);
    return data;
  } catch (error) {
    console.error('Error retrieving cart data:', error);
    throw error;
  }
};

const addToCartDB = async (userID, prodID) => {
	try {
		await pool.query(`
			INSERT INTO cart (userID, prodID)
			VALUES (?, ?)
			`, [userID, prodID]);
		} catch (error) {
			console.error('Error adding cart data:', error);
			throw error
		}
}

const deleteCartItemsDB = async (userID) => {
	try {
		await pool.query(`
			TRUNCATE TABLE cart;
			WHERE userID = ?
			`, [userID]
		);
		} catch (error) {
			console.error('Error deleting cart data:', error);
			throw error;
	}
}

const deleteCartDB = async (id) => {
  try {
    const [result] = await pool.query(`
      SELECT * FROM cart
      WHERE cartID = ?
    `, [id]);
    if (result.length === 0) {
      throw new Error('Cart item not found');
    }
    await pool.query(`
      DELETE FROM cart
      WHERE cartID = ?
    `, [id]);
  } catch (error) {
    console.error('Error deleting cart data:', error);
    throw error;
  }
}

const updateCartDB = async (userID, prodID, id) => {
  try {
    const [result] = await pool.query(`
      SELECT * FROM cart
      WHERE cartID = ?
    `, [id]);
    if (result.length === 0) {
      throw new Error('Cart item not found');
    }
    await pool.query(`
      UPDATE cart
      SET userID = ?,
      prodID = ?
      WHERE cartID = ?
    `, [userID, prodID, id]);
  } catch (error) {
    console.error('Error updating cart data:', error);
    throw error
  }
}

export { getCartsDB, addToCartDB, deleteCartItemsDB, deleteCartDB, updateCartDB }