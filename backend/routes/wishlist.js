const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

router.get('/', auth, async (req, res) => {
  const userId = req.user.sub;
  let list = await Wishlist.findOne({ user: userId }).populate('products');
  if (!list) {
    list = await Wishlist.create({ user: userId, products: [] });
  }
  res.json(list);
});

router.post('/toggle', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ error: 'productId required' });
    const userId = req.user.sub;
    let list = await Wishlist.findOne({ user: userId });
    if (!list) list = await Wishlist.create({ user: userId, products: [] });

    const exists = list.products.find(p => String(p) === String(productId));
    if (exists) {
      list.products = list.products.filter(p => String(p) !== String(productId));
    } else {
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ error: 'product not found' });
      list.products.push(productId);
    }
    await list.save();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
