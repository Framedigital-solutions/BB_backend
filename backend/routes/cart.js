const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

const addSchema = Joi.object({ productId: Joi.string().required(), quantity: Joi.number().min(1).required() });

// Add or update an item in the user's cart
router.post('/add', auth, async (req, res) => {
  try {
    const { error, value } = addSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const product = await Product.findById(value.productId);
    if (!product) return res.status(404).json({ error: 'product not found' });

    let cart = await Cart.findOne({ user: req.user.sub });
    if (!cart) cart = await Cart.create({ user: req.user.sub, items: [] });

    const existing = cart.items.find(i => String(i.product) === String(value.productId));
    if (existing) {
      existing.quantity = existing.quantity + value.quantity;
      existing.priceSnapshot = product.price;
    } else {
      cart.items.push({ product: value.productId, quantity: value.quantity, priceSnapshot: product.price });
    }
    cart.updatedAt = new Date();
    await cart.save();
    await cart.populate('items.product');
    res.json({ success: true, cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

router.get('/', auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.sub }).populate('items.product');
  res.json(cart || { items: [] });
});

router.post('/remove', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    let cart = await Cart.findOne({ user: req.user.sub });
    if (!cart) return res.json({ success: true, cart: { items: [] } });
    cart.items = cart.items.filter(i => String(i.product) !== String(productId));
    await cart.save();
    await cart.populate('items.product');
    res.json({ success: true, cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
