const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create contact (from landing page form)
router.post('/', async (req, res) => {
  try {
    const contact = new Contact({
      fullName: req.body.fullName,
      email: req.body.email,
      mobile: req.body.mobile,
      city: req.body.city
    });

    const newContact = await contact.save();
    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      contact: newContact 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
