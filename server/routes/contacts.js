var express = require('express');
var router = express.Router();
const Contact = require('../models/contact');

router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/contact/:name', async(req, res) => {
  try {
    const contact = await Contact.find({ name: req.params.name });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/contact', async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    phone: req.body.phone
  });

  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/contact/:name', async (req, res) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate (
      { name: req.params.name },
      req.body,
      { new: true }
    );

    res.json(updatedContact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

router.delete('/contact/:name', async (req, res) => {
  try {
    const deletedContact = await Contact.findOneAndDelete (
      { name: req.params.name },
      req.body
    );

    res.json(deletedContact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

module.exports = router;
