const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Simple tracking by trackingId
router.get('/:trackingId', async (req, res) => {
  const { trackingId } = req.params;
  const order = await Order.findOne({ trackingId }).select('status trackingId createdAt updatedAt');
  if (!order) return res.status(404).json({ error: 'not found' });
  res.json(order);
});

module.exports = router;
