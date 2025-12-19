const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

// Get all subscribers
router.get('/', async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Subscribe to newsletter
router.post('/', async (req, res) => {
  try {
    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email: req.body.email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const subscriber = new Newsletter({
      email: req.body.email
    });

    const newSubscriber = await subscriber.save();
    res.status(201).json({ 
      message: 'Successfully subscribed to newsletter',
      subscriber: newSubscriber 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Unsubscribe
router.delete('/:id', async (req, res) => {
  try {
    const subscriber = await Newsletter.findByIdAndDelete(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }
    res.json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
