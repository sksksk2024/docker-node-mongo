const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Use dotenv for local environment variable management

const app = express();

const dns = require('dns');

// Log MongoDB hostname resolution status
dns.lookup('mongo', (err, address, family) => {
  if (err) {
    console.error('DNS resolution failed:', err.message);
  } else {
    console.log(`Mongo resolved to ${address} with IPv${family}`);
  }
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

const mongoUrl =
  process.env.MONGO_URL || 'mongodb://mongo:27017/docker-node-mongo';

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const Item = require('./models/Item');

app.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.render('index', { items });
  } catch (err) {
    res.status(404).json({ msg: 'No items found' });
  }
});

app.post('/item/add', async (req, res) => {
  try {
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).json({ msg: 'Error adding item' });
  }
});

const connectWithRetry = () => {
  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
};

connectWithRetry();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}...`));
