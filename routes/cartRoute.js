import express from 'express';
import { fetchCartItems, addToCart, deleteAllCartItems, deleteCartItem, updateCartItem } from '../controller/cartFunctions.js'

const cartRouter = express.Router()

cartRouter.get('/user/:id/carts', (req, res) => {
        fetchCartItems(req, res);
    })
    
cartRouter.post('/user/:id/cart', async (req, res) => {
    try {
        const userId = req.params.id;
        await addToCart(req, res, userId);
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Error adding item to cart' });
    }
})
    
cartRouter.patch('/user/:id/cart/:prodID', async (req, res) => {
    try {
        const userID = req.params.id
        const prodID = req.params.prodID
        const quantity = req.body.quantity
        await updateCartItem(req, res, userID, prodID, quantity);
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Error updating cart item' });
    }
})
    
cartRouter.delete('/user/:id/cart', (req, res) => {
    const userId = req.params.id;
    deleteAllCartItems(req, res, userId);
})
    
cartRouter.delete('/user/:id/cart/:cartId', (req, res) => {
    const cartItemID = req.params.cartId;
    deleteCartItem(req, res, cartItemID);
})

export default cartRouter