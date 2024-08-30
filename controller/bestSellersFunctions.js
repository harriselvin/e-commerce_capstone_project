import { getBestSellersDB } from "../model/bestSellersDB.js";

const fetchBestSellers = async (req, res) => {
    res.json(await getBestSellersDB())
}

export { fetchBestSellers }