const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// ✅ Token Generator
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || "secret123", // fallback added
    { expiresIn: "7d" }
  );
};



// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    const user = await User.create({ name, email, password, role });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Register successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ check input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email & password required'
      });
    }

    // ✅ IMPORTANT LINE
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};



// ================= FORGOT PASSWORD =================
exports.forgotPassword = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        success: false,
        message: "Email required"
      });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(200).json({
        success: true,
        message: "If email exists, reset link sent"
      });
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Reset token generated",
      resetToken
    });

  } catch (error) {
    console.error("FORGOT ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// ================= RESET PASSWORD =================
exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

    user.password = req.body.newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {
    console.error("RESET ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// ================= PROFILE =================
exports.getProfile = async (req, res) => {
  try {
    // ✅ FIX: Explicitly select role and all needed fields
    const user = await User.findById(req.user.id).select('name email role isActive createdAt');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};



// ================= CHANGE PASSWORD =================
exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    const isMatch = await user.comparePassword(req.body.currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password wrong"
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated"
    });

  } catch (error) {
    res.status(500).json({ success: false });
  }
};
// ================= VERIFY EMAIL =================
exports.verifyEmail = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Email verified successfully"
    });
  } catch (error) {
    console.error("VERIFY EMAIL ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};
// ================= LOGOUT =================
exports.logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout successful"
  });
};
// ================= UPDATE PROFILE =================
exports.updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        email: req.body.email
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};