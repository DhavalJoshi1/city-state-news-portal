const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Category name is required'], 
    unique: true, 
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters']
  },
  slug: { 
    type: String, 
    unique: true, 
    lowercase: true 
  },
  description: { 
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  image: {
    type: String, 
    default: ''
  },
  order: {
    type: Number,
    default: 0 
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
// Removed duplicate index on slug since unique:true automatically indexes it
categorySchema.index({ isActive: 1, order: 1 });

// --- VIRTUAL: Count total news in this category ---
categorySchema.virtual('newsCount', {
  ref: 'News',
  localField: '_id',
  foreignField: 'category',
  count: true
});

// --- PRE-SAVE MIDDLEWARE ---
categorySchema.pre('save', async function() {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { 
      lower: true, 
      strict: true,
      trim: true 
    });
  }
});

module.exports = mongoose.model('Category', categorySchema);