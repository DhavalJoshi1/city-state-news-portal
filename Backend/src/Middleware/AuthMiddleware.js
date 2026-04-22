const jwt = require('jsonwebtoken');
const User = require('../Models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      const error = new Error('Aap authorized nahi hain. Please login karein.');
      error.statusCode = 401;
      return next(error);
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtErr) {
      const error = new Error('Token invalid hai ya expire ho chuka hai.');
      error.statusCode = 401;
      return next(error);
    }

    const currentUser = await User.findById(decoded.id).select('-password');
    if (!currentUser) {
      const error = new Error('Is token ka user ab system mein nahi hai.');
      error.statusCode = 401;
      return next(error);
    }

    if (currentUser.isActive === false) {
      const error = new Error('Aapka account deactivate kar diya gaya hai.');
      error.statusCode = 403;
      return next(error);
    }

    req.user = currentUser;
    next();
  } catch (err) {
    console.log(err);
    
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      const error = new Error('User context not found.');
      error.statusCode = 500;
      return next(error);
    }
    if (!roles.includes(req.user.role)) {
      console.log(`[AUTH DEBUG] Access Denied for ${req.user.email}. Role: ${req.user.role}. Required: ${roles}`);
      const error = new Error(`Access Denied: ${req.user.role} is action ko nahi kar sakta.`);
      error.statusCode = 403;
      return next(error);
    }
    next();
  };
};