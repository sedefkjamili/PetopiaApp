// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes')); // ✅ doğru yer burası
app.use('/api/pets', require('./routes/petRoutes'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/contact', require('./routes/contactRoutes'));


// Eğer pet rotaları eklersen: app.use('/api/pets', require('./routes/petRoutes'));

// MongoDB bağlantısı ve sunucuyu başlat
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
