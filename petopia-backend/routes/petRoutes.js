const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const Notification = require('../models/Notification');

router.post('/add', async (req, res) => {
  try {
    const { name, type, description, imageUri } = req.body;
    const newPet = new Pet({ name, type, description, imageUri });
    await newPet.save();

    // 🔔 Bildirim oluştur
    await Notification.create({
      title: 'New Pet Added!',
      body: `${name} the ${type} has been added.`,
    });

    console.log('✅ New pet and notification saved');
    res.status(201).json({ message: 'Pet and notification saved' });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
