const mongoose = require('mongoose');
const slugify = require('slugify');

const citySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'City name is required'], 
    unique: true, 
    trim: true,
    maxlength: [100, 'City name cannot exceed 100 characters']
  },
  slug: { // URL friendly name (e.g., "New Delhi" -> "new-delhi")
    type: String,
    unique: true,
    lowercase: true
  },
  state: { 
    type: String, 
    required: [true, 'State name is required'],
    trim: true 
  },
  isActive: {
    type: Boolean,
    default: true 
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// --- INDEXING ---
// Removed duplicate index on name and slug since unique:true automatically indexes them

// --- VIRTUAL: Count news in this city ---
citySchema.virtual('newsCount', {
  ref: 'News',
  localField: '_id',
  foreignField: 'city',
  count: true
});

// --- PRE-SAVE MIDDLEWARE ---
citySchema.pre('save', async function() {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
});

module.exports = mongoose.model('City', citySchema);