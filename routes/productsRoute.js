import express from 'express';
import { fetchProducts, fetchProduct, addProduct, deleteProduct, updateProduct } from '../controller/productsFunctions.js'
import { verifyToken } from '../middleware/authenticate.js';

const prodRouter = express.Router()

prodRouter.get('/items', fetchProducts)
        .get('/item/:id', fetchProduct)
        .post('/items', verifyToken, addProduct)
        .put('item/:id', verifyToken, updateProduct)
        .delete('item/:id', verifyToken, deleteProduct)

export default prodRouter
