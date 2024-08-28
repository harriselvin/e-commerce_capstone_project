import express from 'express';
import { fetchProducts } from '../controller/productsFunctions.js'

const prodRouter = express.Router()

prodRouter.get('/', fetchProducts)

export default prodRouter
