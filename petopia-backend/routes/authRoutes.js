// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// POST /api/auth/signup → Yeni kullanıcı kaydı
router.post('/signup', signup);

// POST /api/auth/login → Kullanıcı girişi
router.post('/login', login);

module.exports = router;
