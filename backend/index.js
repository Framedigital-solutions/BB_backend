require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: FRONTEND_ORIGIN }));

// Basic rate limiting
const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 });
app.use(limiter);

// Connect to MongoDB (supports Atlas via MONGO_URI)
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/badshadb';
const usingAtlas = MONGO.startsWith('mongodb+srv://');
console.log(`Mongo connection target: ${usingAtlas ? 'MongoDB Atlas' : MONGO}`);
if (usingAtlas) {
  console.log(`Atlas connection string: ${MONGO.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
}

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('Mongo connect error');
    console.error(err && err.message ? err.message : err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/addresses', require('./routes/addresses'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/track', require('./routes/track'));
app.use('/api/health', require('./routes/health'));

app.get('/ping', (req, res) => res.json({ ok: true }));

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 4000;
const MAX_PORT_RETRIES = 5; // try a few ports if the default is busy

function startServer(port, retriesLeft) {
  const server = app.listen(port, () => console.log(`Backend running on port ${port}`));

  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      if (retriesLeft > 0) {
        console.warn(`Port ${port} is in use. Trying port ${port + 1} (${retriesLeft - 1} retries left)...`);
        // small delay before retrying
        setTimeout(() => startServer(port + 1, retriesLeft - 1), 100);
      } else {
        console.error(`Port ${port} is in use and no retries left. Server cannot start.`);
        console.error('If you want to free the port on Windows run:');
        console.error('  netstat -ano | findstr :4000');
        console.error('  taskkill /PID <pid> /F');
        process.exit(1);
      }
    } else {
      console.error('Server failed with error:', err);
      process.exit(1);
    }
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down server...');
    server.close(() => process.exit(0));
  });
}

startServer(DEFAULT_PORT, MAX_PORT_RETRIES);
