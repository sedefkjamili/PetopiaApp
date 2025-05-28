const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  imageUri: String,
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
