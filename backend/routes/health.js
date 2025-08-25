const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// GET /api/health
// returns a small JSON object describing mongoose connection state
router.get('/', (req, res) => {
  const state = mongoose.connection.readyState; // 0 disconnected,1 connected,2 connecting,3 disconnecting
  const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.json({ ok: state === 1, state: states[state] || state });
});

module.exports = router;
