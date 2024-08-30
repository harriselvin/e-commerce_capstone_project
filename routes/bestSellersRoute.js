import express from 'express'
import { fetchBestSellers } from '../controller/bestSellersFunctions.js'

const sellerRoute = express.Router()

sellerRoute.get('/bestSellers', fetchBestSellers)

export default sellerRoute