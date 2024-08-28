import { getProductsDB } from '../model/productsDB.js'

const fetchProducts = async (req, res) => {
  res.json(await getProductsDB())
}

export { fetchProducts }


