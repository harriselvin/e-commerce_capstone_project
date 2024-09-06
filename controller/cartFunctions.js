import { getCartsDB, addToCartDB, deleteCartItemsDB, deleteCartDB, updateCartDB } from "../model/cartDB.js"; 
import { pool } from '../model/cartDB.js'

const fetchCartItems = async (req, res) => {
    const userId = req.params.id

    try {
        const cartItems = await getCartsDB(userId);
        res.json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching cart items');
    }
}

const addToCart = async (req, res, userId) => {
    const { prodID, quantity } = req.body

    if (!prodID || !quantity) {
        return res.status(400).send({ message: 'Invalid request data' });
    }

    try {
        // Check if the item already exists
        const [existingItems] = await pool.query(`
            SELECT * FROM cart WHERE userID = ? AND prodID = ?
            `, [userId, prodID])

        if (existingItems.length > 0) {
            // If item exists, update the quantity
            await updateCartDB(userId, prodID, quantity)
        } else {
            // If item does not exist, add it
            await addToCartDB(userId, prodID, quantity);
        }

        res.status(201).send({ message: 'Item added to cart successfully' })
    } catch (error) {
        console.error('Error adding item to cart', error);
        res.status(500).send({ message: 'Error adding item to cart'});
    }
}

const deleteAllCartItems = async (req, res) => {
    try {
        const userID = req.params.id;
        await deleteCartItemsDB(userID);
        res.status(200).send('All cart items were successfully deleted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting cart items');
    }
}

const deleteCartItem = async (req, res) => {
    try {
        const cartItemID = req.params.id;
        await deleteCartDB(cartItemID);
        res.status(200).send('Cart item was successfully deleted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting cart item');
    }
}

const updateCartItem = async (req, res, userID, prodID, quantity) => {
    if (!userID || !prodID || !quantity) {
        return res.status(400).send('Invalid request data');
    }
    
    try {
        await updateCartDB(userID, prodID, quantity);
        return res.status(200).send('Cart item quantity was successfully updated');
    } catch (error) {
        console.error('Error updating cart item', error);

        if (!res.headerSent) {
            return res.status(500).send('Error updating cart item');
        }
    }
}

export { fetchCartItems, addToCart, deleteAllCartItems, deleteCartItem, updateCartItem }