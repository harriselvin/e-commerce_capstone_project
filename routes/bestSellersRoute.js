import express from 'express'
import { fetchBestSellers, fetchBestSeller } from '../controller/bestSellersFunctions.js'

const sellerRoute = express.Router()

sellerRoute.get('/bestSellers', fetchBestSellers)
sellerRoute.get('/bestSeller/:id', fetchBestSeller)

export default sellerRoute