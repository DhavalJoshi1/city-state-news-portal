const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please provide your name'] 
  },
  email: { 
    type: String, 
    required: [true, 'Please provide your email'], 
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: { 
    type: String, 
    required: [true, 'Please provide a password'], 
    minlength: 8,
    select: false 
  },
  role: { 
    type: String, 
    enum: ['user', 'reporter', 'admin'],
    default: 'user' 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  lastLogin: Date
}, { timestamps: true });

// 🔒 Hash password before saving
userSchema.pre('save', async function () {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return;

  // Hash the password with cost of 10
  this.password = await bcrypt.hash(this.password, 10);

  // Update passwordChangedAt property for JWT verification
  if (!this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
  }
});

// 🔑 Helper to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// 🛡️ Generate Password Reset Token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Hash the token and set to database field
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expiry to 10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', userSchema);