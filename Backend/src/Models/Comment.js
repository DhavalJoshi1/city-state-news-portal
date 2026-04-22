const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Comment text is required'],
    trim: true,
    maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    minlength: [1, 'Comment cannot be empty']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  // Polymorphic Reference (News ya Article dono ke liye ek hi field)
  news: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'News'
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'spam'],
    default: 'approved' // Initial level par approved rakha hai
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  editedAt: Date,
  reportedCount: {
    type: Number,
    default: 0
  },
  reports: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reason: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// --- INDEXES ---
commentSchema.index({ news: 1, createdAt: -1 });
commentSchema.index({ article: 1, createdAt: -1 });
commentSchema.index({ parentComment: 1 });
commentSchema.index({ status: 1 });

// --- VIRTUALS ---
commentSchema.virtual('likeCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

commentSchema.virtual('replyCount').get(function() {
  return this.replies ? this.replies.length : 0;
});

// --- MIDDLEWARE: Recursive Delete ---
// Jab main comment delete ho, toh saare replies bhi delete ho jayein
commentSchema.pre('findOneAndDelete', async function(next) {
  const doc = await this.model.findOne(this.getQuery());
  if (doc) {
    await mongoose.model('Comment').deleteMany({ parentComment: doc._id });
  }
  next();
});

// --- STATIC METHODS ---
commentSchema.statics.getForContent = function(contentId, contentType = 'news') {
  const filter = contentType === 'news' ? { news: contentId } : { article: contentId };
  return this.find({ ...filter, parentComment: null, status: 'approved' })
    .populate('user', 'name avatar') // username ki jagah name (aapke User model ke hisaab se)
    .populate({
      path: 'replies',
      match: { status: 'approved' },
      populate: { path: 'user', select: 'name avatar' }
    })
    .sort({ createdAt: -1 }); // Latest comments pehle
};

module.exports = mongoose.model('Comment', commentSchema);