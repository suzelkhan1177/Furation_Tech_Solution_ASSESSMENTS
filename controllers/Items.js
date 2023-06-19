const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const logger = require('../logger');


// GET /api/items
router.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    logger.info('GET /api/items endpoint called.');
    res.json(items);
  } catch (err) {
    logger.error(err.stack);
    res.status(500).json({ message: 'Failed to retrieve items.' });
  }
});

// GET /api/items/:id
router.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item) {
    logger.info('GET /api/items/:id endpoint called.');
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found.' });
    }
  } catch (err) {
    logger.error(err.stack);
    res.status(500).json({ message: 'Failed to retrieve the item.' });
  }
});

// POST /api/items
router.post('/api/items', async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Perform validation checks
    if (!name || !description || !price) {
      return res.status(400).json({ message: 'Please provide name, description, and price.' });
    }
  
    // Create a new item in the database (replace this with your own implementation)
    const newItem = {
      name,
      description,
      price,
    };
  
    // Log the created item
    logger.info(' POST /api/items New item created:', newItem);
  
    // Return the created item in the response
    res.status(201).json(newItem);
  } catch (err) {
    logger.error(err.stack);
    res.status(500).json({ message: 'Failed to create the item.' });
  }
});

// PUT /api/items/:id
router.put('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (item) {
      
    logger.info('PUT /api/items/:id endpoint called.');
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found.' });
    }
  } catch (err) {
    logger.error(err.stack);
    res.status(500).json({ message: 'Failed to update the item.' });
  }
});

// DELETE /api/items/:id
router.delete('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (item) {
      
    logger.info('DELETE /api/items/:id endpoint called.');
      res.json({ message: 'Item deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Item not found.' });
    }
  } catch (err) {
    logger.error(err.stack);
    res.status(500).json({ message: 'Failed to delete the item.' });
  }
});

module.exports = router;
