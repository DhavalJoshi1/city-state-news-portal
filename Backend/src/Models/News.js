const mongoose = require('mongoose');
const slugify = require('slugify');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: { 
    type: String, 
    unique: true, // ✅ Indexing ke liye ye akela kaafi hai
    lowercase: true 
  },
  content: { type: String, required: [true, 'Content is required'] },
  summary: { type: String, maxlength: [500] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  status: {
    type: String,
    enum: ['pending', 'published', 'rejected', 'archived', 'draft'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'breaking'],
    default: 'medium'
  },
  views: { type: Number, default: 0 },
  image: { type: String, default: '' },
  video: { type: String, default: '' },
  publishedAt: { type: Date }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// --- INDEXING ---
newsSchema.index({ title: 'text', content: 'text' }); 
// ❌ REMOVED: newsSchema.index({ slug: 1 }); -> Duplicate warning fix
newsSchema.index({ city: 1, category: 1 }); 

// --- PRE-SAVE MIDDLEWARE ---
newsSchema.pre('save', async function() {
  // 1. Slugify logic
  if (this.isModified('title')) {
    const randomID = Math.floor(1000 + Math.random() * 9000); 
    this.slug = `${slugify(this.title, { lower: true, strict: true })}-${randomID}`;
  }

  // 2. Published Date logic
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = Date.now();
  }
});

module.exports = mongoose.model('News', newsSchema);