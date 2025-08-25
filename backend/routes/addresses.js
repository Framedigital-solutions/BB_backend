const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Address = require('../models/Address');

router.get('/', auth, async (req, res) => {
  const list = await Address.find({ user: req.user.sub });
  res.json(list);
});

router.post('/', auth, async (req, res) => {
  try {
    const payload = req.body;
    const address = new Address({ ...payload, user: req.user.sub });
    if (payload.isDefault) {
      await Address.updateMany({ user: req.user.sub }, { isDefault: false });
    }
    await address.save();
    res.json(address);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    if (payload.isDefault) {
      await Address.updateMany({ user: req.user.sub }, { isDefault: false });
    }
    const updated = await Address.findOneAndUpdate({ _id: id, user: req.user.sub }, payload, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    await Address.findOneAndDelete({ _id: id, user: req.user.sub });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
