const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

/**
 * ✅ 1. Handle Validation Results
 * Ye middleware express-validator ke results ko check karta hai.
 */
const handleValidationErrors = (req, res , next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    // Sabse pehla error message frontend par dikhane ke liye
    const firstError = errors.array()[0].msg;
    
    const error = new Error(firstError || 'Validation Failed');
    error.statusCode = 400;
    
    // Frontend map() karne ke liye structured data
    // Hum ise 'data' property mein daal rahe hain kyunki app.js 'err.data' read kar raha hai
    error.data = errors.array().map(err => ({
      field: err.path,
      message: err.msg
    }));

    return next(error); // ✅ Yeh seedha Global Error Handler (app.js) mein jayega
  }
  
  // Agar koi validation error nahi hai, toh aage badho
  next(); 
};

/**
 * ✅ 2. Validate MongoDB ObjectId
 * Ensure karta hai ki ID format sahi hai (Prevent server crash)
 */
const validateObjectId = (req, res, next) => {
  // Check ID from params, body, or query
  const id = req.params.id || req.body.id || req.query.id;

  if (id && !mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error(`Invalid ID format: '${id}' ek valid MongoDB ID nahi hai.`);
    error.statusCode = 400;
    return next(error);
  }

  next();
};

module.exports = {
  handleValidationErrors,
  validateObjectId
};