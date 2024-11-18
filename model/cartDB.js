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

const addToCartDB = async (userId, product, quantity) => {
  if (!userId || !product || !quantity) {
    throw new Error('Invalid input parameters')
  }

	try {
      await pool.query(`
        INSERT INTO cart (userID, prodID, quantity)
        VALUES (?, ?, ?)
        `, [userId, product, quantity])
  } catch (error) {
    console.error('Error adding cart data:', error);
    throw error
  }
}

const deleteCartItemsDB = async (userID) => {
	try {
		await pool.query(`
			DELETE FROM cart
			WHERE userID = ?
			`, [userID]);
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

const updateCartDB = async (userID, prodID, quantity) => {
  try {
    const [result] = await pool.query(`
      SELECT * FROM cart
      WHERE userID = ? AND prodID = ?
    `, [userID, prodID]);

    if (result.length === 0) {
      console.error(`Cart item not found for userID: ${userID}, prodID: ${prodID}`);
      throw new Error('Cart item not found');
    }
    await pool.query(`
      UPDATE cart
      SET quantity = ?
      WHERE userID = ? AND prodID = ?
    `, [quantity, userID, prodID]);
  } catch (error) {
    console.error('Error updating cart data:', error);
    throw error
  }
}

export { pool, getCartsDB, addToCartDB, deleteCartItemsDB, deleteCartDB, updateCartDB }