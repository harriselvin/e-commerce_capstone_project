import { getBestSellersDB, getBestSellerDB } from "../model/bestSellersDB.js";

const fetchBestSellers = async (req, res) => {
    res.json(await getBestSellersDB())
}

const fetchBestSeller = async (req, res) => {
    res.json(await getBestSellerDB(req.params.id))
  }

export { fetchBestSellers, fetchBestSeller }