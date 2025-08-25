const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Create an order from cart
router.post('/', auth, async (req, res) => {
  try {
    const userId = req.user.sub;
    const { paymentMethod, shippingAddress } = req.body;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'cart is empty' });

    const items = cart.items.map(i => ({ product: i.product._id, quantity: i.quantity, price: i.priceSnapshot || i.product.price }));
    const total = items.reduce((s, it) => s + (it.price * it.quantity), 0);

    const order = new Order({ user: userId, items, total, paymentMethod, shippingAddress, status: 'placed', trackingId: `TRK-${Date.now()}-${Math.floor(Math.random()*9000)}` });
    await order.save();

    // clear cart
    cart.items = [];
    await cart.save();

    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

router.get('/', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.sub }).sort({ createdAt: -1 });
  res.json(orders);
});

router.get('/:id', auth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user.sub }).populate('items.product');
  if (!order) return res.status(404).json({ error: 'not found' });
  res.json(order);
});

module.exports = router;
