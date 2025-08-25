const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');

// GET /api/categories - list categories
router.get('/', async (req, res) => {
  try {
    const cats = await Category.find();
    res.json(cats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// GET /api/categories/:key/products - products for a category key
router.get('/:key/products', async (req, res) => {
  try {
    const { key } = req.params;
    const products = await Product.find({ 'categories.key': key });
    // If products don't store categories, try fallback to product.category field
    if (!products || products.length === 0) {
      const fallback = await Product.find({ category: key });
      return res.json(fallback || []);
    }
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
