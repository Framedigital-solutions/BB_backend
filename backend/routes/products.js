const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Joi = require('joi');

const createSchema = Joi.object({ title: Joi.string().required(), slug: Joi.string().required(), description: Joi.string().allow(''), price: Joi.number().required(), images: Joi.array().items(Joi.string()).optional(), mainImage: Joi.string().optional(), colors: Joi.array().items(Joi.string()).optional(), sizes: Joi.array().items(Joi.string()).optional(), stock: Joi.number().optional() });

router.get('/', async (req, res) => {
  try {
    const { slug, q, category, minPrice, maxPrice, sort, page = 1, limit = 20 } = req.query;
    if (slug) {
      const p = await Product.findOne({ slug });
      if (!p) return res.status(404).json({ error: 'not found' });
      return res.json(p);
    }

    const filter = {};
    if (q) filter.$or = [ { title: new RegExp(q, 'i') }, { description: new RegExp(q, 'i') }, { slug: new RegExp(q, 'i') } ];
    if (category) filter.$or = [{ 'categories.key': category }, { category }];
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);

    let cursor = Product.find(filter);
    if (sort) {
      const s = {};
      if (sort === 'price_asc') s.price = 1;
      else if (sort === 'price_desc') s.price = -1;
      else if (sort === 'newest') s.createdAt = -1;
      cursor = cursor.sort(s);
    }

    const products = await cursor.skip((page-1)*(limit)).limit(parseInt(limit));
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { error, value } = createSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const prod = new Product(value);
    await prod.save();
    res.json(prod);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
