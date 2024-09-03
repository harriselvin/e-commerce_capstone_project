import { getProductsDB, getProductDB, addProductDB, deleteProductDB, updateProductDB } from '../model/productsDB.js'

const fetchProducts = async (req, res) => {
  res.json(await getProductsDB())
}

const fetchProduct = async (req, res) => {
  res.json(await getProductDB(req.params.id))
}

const addProduct = async (req, res) => {
  let { prodName, price, quantity, category, prodUrl, prodDesc, prodInfo } = req.body

  await addProductDB(prodName, price, quantity, category, prodUrl, prodDesc, prodInfo)
  res.status(200).send('Product was successfully added')
}

const deleteProduct = async (req, res) => {
  await deleteProductDB(req.params.id)
  res.status(200).send('Product was successfully deleted')
}

const updateProduct = async (req, res) => {
  let { prodName, price, quantity, category, prodUrl, prodDesc, prodInfo } = req.body
  let product = await getProductDB(req.params.id)

  prodName ? prodName = prodName : prodName = product.prodName
  price ? price = price : price = product.price
  quantity ? quantity = quantity : quantity = product.quantity
  category ? category = category : category = product.category
  prodUrl ? prodUrl = prodUrl : prodUrl = product.prodUrl
  prodDesc ? prodDesc = prodDesc : prodDesc = product.prodDesc
  prodInfo ? prodInfo = prodInfo : prodInfo = product.prodInfo

  await updateProduct(prodName, price, quantity, category, prodUrl, prodDesc, prodInfo, req.params.id)
  res.status(200).send('Product info was successfully updated')
}

export { fetchProducts, fetchProduct, addProduct, deleteProduct, updateProduct }


