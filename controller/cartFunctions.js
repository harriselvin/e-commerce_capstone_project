import { getCartsDB, addToCartDB, deleteCartItemsDB, deleteCartDB, updateCartDB } from "../model/cartDB.js"; 

const fetchCartItems = async (req, res) => {
    try {
        const cartItems = await getCartsDB();
        res.json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching cart items');
    }
}

const fetchCartItem = async (req, res) => {
    try {
        const cartItem = await getCartDB(req.params.id);
        if (!cartItem) {
            res.status(404).send('Cart item not found');
        } else {
            res.json(cartItem);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching cart item');
    }
}

const addToCart = async (req, res) => {
    try {
        const { userID, prodID } = req.body;
        await addToCartDB(userID, prodID);
        res.status(200).send('Cart item was successfully added');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding cart item');
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

const updateCartItem = async (req, res) => {
    try {
        const cartItemID = req.params.id;
        const { userID, prodID } = req.body;
        const cartItem = await getCartDB(cartItemID);
        if (!cartItem) {
            res.status(404).send('Cart item not found');
        } else {
            const newUserID = userID || cartItem.userID;
            const newProdID = prodID || cartItem.prodID;
            await updateCartDB(newUserID, newProdID, cartItemID);
            res.status(200).send('Cart info was successfully updated');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating cart item');
    }
}

export { fetchCartItems, fetchCartItem, addToCart, deleteAllCartItems, deleteCartItem, updateCartItem }