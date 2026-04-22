const mongoose = require('mongoose');
const slugify = require('slugify'); // Slug generation ke liye

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
    minlength: [5, 'Title must be at least 5 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [50, 'Content must be at least 50 characters']
  },
  summary: {
    type: String,
    maxlength: [500, 'Summary cannot exceed 500 characters']
  },
  author: { // Creator/User
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: [true, 'City is required']
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  status: {
    type: String,
    enum: ['draft', 'pending', 'published', 'rejected', 'archived'],
    default: 'pending' // Default pending rakha hai approval system ke liye
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'breaking'],
    default: 'medium'
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  image: {
    type: String,
    trim: true,
    default: ''
  },
  video: { // Video support add kiya
    type: String,
    trim: true,
    default: ''
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// --- INDEXES ---
articleSchema.index({ title: 'text', content: 'text', summary: 'text' });
articleSchema.index({ status: 1, createdAt: -1 });
// Removed duplicate index on slug since unique:true automatically indexes it

// --- VIRTUALS ---
articleSchema.virtual('readingTime').get(function() {
  const wordsPerMinute = 200;
  const words = this.content ? this.content.split(/\s+/).length : 0;
  return Math.ceil(words / wordsPerMinute);
});

// --- PRE-SAVE MIDDLEWARE ---
articleSchema.pre('save', function(next) {
  // Auto-slug generation
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  // Published date logic
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// --- STATIC METHODS ---
articleSchema.statics.getPopular = function(limit = 10) {
  return this.find({ status: 'published' })
    .sort({ views: -1 })
    .limit(limit)
    .populate('author', 'name')
    .populate('category', 'name');
};

module.exports = mongoose.model('Article', articleSchema);