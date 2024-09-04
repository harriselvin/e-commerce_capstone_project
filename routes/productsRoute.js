import express from 'express';
import { fetchProducts, fetchProduct, addProduct, deleteProduct, updateProduct } from '../controller/productsFunctions.js'
import { verifyToken } from '../middleware/authenticate.js';

const prodRouter = express.Router()

prodRouter.get('/items', fetchProducts)
        .get('/item/:id', fetchProduct)
        .post('/items', addProduct)
        .put('item/:id', updateProduct)
        .delete('item/:id', deleteProduct)

export default prodRouter
