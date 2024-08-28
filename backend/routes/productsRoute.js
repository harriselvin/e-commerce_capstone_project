import express from 'express';
import { fetchProducts, fetchProduct } from '../controller/productsFunctions.js'

const prodRouter = express.Router()

prodRouter.get('/items', fetchProducts)
prodRouter.get('/item/:id', fetchProduct)

export default prodRouter
