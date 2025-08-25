const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');

const signupSchema = Joi.object({ username: Joi.string().min(3).required(), email: Joi.string().email().required(), password: Joi.string().min(6).required(), displayName: Joi.string().optional() });
const loginSchema = Joi.object({ username: Joi.string().required(), password: Joi.string().required() });

router.post('/signup', async (req, res) => {
  try {
    const { error, value } = signupSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const existing = await User.findOne({ $or: [{ username: value.username }, { email: value.email }] });
    if (existing) return res.status(400).json({ error: 'User exists' });

    const hash = await bcrypt.hash(value.password, 10);
    const user = new User({ username: value.username, email: value.email, passwordHash: hash, displayName: value.displayName });
    await user.save();

    const token = jwt.sign({ sub: user._id, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, displayName: user.displayName } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const user = await User.findOne({ username: value.username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(value.password, user.passwordHash);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ sub: user._id, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, displayName: user.displayName } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Simple auth middleware
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Missing token' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.sub).select('-passwordHash');
  res.json(user);
});

module.exports = router;
