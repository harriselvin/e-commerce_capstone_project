import express from 'express';
import { fetchCartItems, addToCart, deleteAllCartItems, deleteCartItem, updateCartItem } from '../controller/cartFunctions.js'

const cartRouter = express.Router()

// cartRouter.get('/user/:id/carts', fetchCartItems)
//         .post('/user/:id/cart', addToCart)
//         .patch('/user/:id/cart/:id', updateCartItem)
//         .delete('/user/:id/cart', deleteAllCartItems)
//         .delete('/user/:id/cart/:id', deleteCartItem)

cartRouter.get('/user/:id/carts', (req, res) => {
        const userId = req.params.id;
        fetchCartItems(userId, req, res);
    })
    
    .post('/user/:id/cart', (req, res) => {
        const userId = req.params.id;
        const cartItem = req.body; // assuming the cart item data is in the request body
        addToCart(userId, cartItem, req, res);
    })
    
    .patch('/user/:id/cart/:cartId', (req, res) => {
        const userId = req.params.id;
        const cartId = req.params.cartId;
        updateCartItem(userId, cartId, req, res);
    })
    
    .delete('/user/:id/cart', (req, res) => {
        const userId = req.params.id;
        deleteAllCartItems(userId, req, res);
    })
    
    .delete('/user/:id/cart/:cartId', (req, res) => {
        const userId = req.params.id;
        const cartId = req.params.cartId;
        deleteCartItem(userId, cartId, req, res);
    })

export default cartRouter