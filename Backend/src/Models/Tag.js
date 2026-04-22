const mongoose = require('mongoose');
const slugify = require('slugify');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tag name is required'],
    unique: true,
    trim: true,
    maxlength: [30, 'Tag name cannot exceed 30 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
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

// --- VIRTUAL: Count news with this tag ---
tagSchema.virtual('newsCount', {
  ref: 'News',
  localField: '_id',
  foreignField: 'tags', // News model mein tags array hona chahiye
  count: true
});

// --- PRE-SAVE MIDDLEWARE ---
// Jab bhi tag name change hoga, slug automatic update ho jayega
tagSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { 
      lower: true, 
      strict: true,
      trim: true 
    });
  }
  next();
});

module.exports = mongoose.model('Tag', tagSchema);