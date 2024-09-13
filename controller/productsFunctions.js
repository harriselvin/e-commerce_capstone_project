import { getProductsDB, getProductDB, addProductDB, deleteProductDB, updateProductDB } from '../model/productsDB.js'

const fetchProducts = async (req, res) => {
  try {
    const products = await getProductsDB();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Failed to fetch products');
  }
};

const fetchProduct = async (req, res) => {
  try {
    const product = await getProductDB(req.params.id);
    if (!product) {
      res.status(404).send('Product not found');
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('Failed to fetch product');
  }
};

const addProduct = async (req, res) => {
  try {
    const { prodName, price, quantity, category, prodUrl, prodDesc, prodInfo } = req.body;
    if (!prodName || !price || !quantity || !category || !prodDesc || !prodInfo) {
      res.status(400).send('All product fields are required');
    } else {
      await addProductDB(prodName, price, quantity, category, prodUrl, prodDesc, prodInfo);
      res.status(201).send('Product was successfully added');
    }
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Failed to add product');
  }
};

const deleteProduct = async (req, res) => {
  try {
    await deleteProductDB(req.params.id);
    res.status(200).send('Product was successfully deleted');
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Failed to delete product');
  }
};

const updateProduct = async (req, res) => {
  try {
    const { prodName, price, quantity, category, prodUrl, prodDesc, prodInfo } = req.body;
    const product = await getProductDB(req.params.id);
    if (!product) {
      res.status(404).send('Product not found');
    } else {
      prodName ? prodName = prodName : prodName = product.prodName;
      price ? price = price : price = product.price;
      quantity ? quantity = quantity : quantity = product.quantity;
      category ? category = category : category = product.category;
      prodUrl ? prodUrl = prodUrl : prodUrl = product.prodUrl;
      prodDesc ? prodDesc = prodDesc : prodDesc = product.prodDesc;
      prodInfo ? prodInfo = prodInfo : prodInfo = product.prodInfo;

      await updateProductDB(prodName, price, quantity, category, prodUrl, prodDesc, prodInfo, req.params.id);
      res.status(200).send('Product info was successfully updated');
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Failed to update product');
  }
};

export { fetchProducts, fetchProduct, addProduct, deleteProduct, updateProduct }


