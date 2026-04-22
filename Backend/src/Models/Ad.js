const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Ad title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Ad image is required']
  },
  link: {
    type: String, // Ad par click karke kahan jana hai
    trim: true
  },
  position: {
    type: String,
    enum: ['top-banner', 'sidebar', 'in-article', 'popup'],
    default: 'sidebar'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date // Kab ad automatic hat jana chahiye
  }
}, { timestamps: true });

// Indexing for performance
adSchema.index({ status: 1, position: 1 });

module.exports = mongoose.model('Ad', adSchema);