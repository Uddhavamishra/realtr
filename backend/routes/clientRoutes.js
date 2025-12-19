const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const { upload, processImage } = require('../middleware/upload');

// Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single client
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create client
router.post('/', upload.single('image'), processImage, async (req, res) => {
  try {
    const client = new Client({
      name: req.body.name,
      description: req.body.description,
      designation: req.body.designation,
      image: `/uploads/${req.file.filename}`
    });

    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update client
router.put('/:id', upload.single('image'), processImage, async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      designation: req.body.designation
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const client = await Client.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete client
router.delete('/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
