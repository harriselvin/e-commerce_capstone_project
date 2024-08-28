import { getProductsDB, getProductDB } from '../model/productsDB.js'

const fetchProducts = async (req, res) => {
  res.json(await getProductsDB())
}

const fetchProduct = async (req, res) => {
  res.json(await getProductDB(req.params.id))
}

export { fetchProducts, fetchProduct }


