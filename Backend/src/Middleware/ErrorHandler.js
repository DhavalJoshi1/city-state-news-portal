/**
 * @desc    Global Error Handling Middleware
 * @logic   Ye middleware poore application ki errors ko catch karke ek uniform format mein response bhejta hai.
 */
const errorHandler = (err, req, res, next) => {
  // 1. Log error for the developer (Only in console)
  console.error(`💥 ERROR NAME: ${err.name}`);
  console.error(`📝 MESSAGE: ${err.message}`);
  
  // 2. Set Status Code (Agar error ka status nahi hai, toh default 500)
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Server Error: Kuch galat ho gaya!';

  // --- 3. HANDLE SPECIFIC ERRORS ---

  // Case: Wrong Mongoose Object ID (Bad ID format)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Resource not found. Invalid ID format: ${err.value}`;
  }

  // Case: Duplicate Field Error (e.g. Same email twice)
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Email ya data pehle se maujood hai. Please doosra try karein.';
  }

  // Case: Mongoose Validation Error (Required fields missing)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  // Case: JWT Invalid Error (Security fix)
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token. Please login again.';
  }

  // Case: JWT Expired Error (Security fix)
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Aapka session khatam ho gaya hai. Dobara login karein.';
  }

  // --- 4. SEND FINAL RESPONSE ---
  res.status(statusCode).json({
    success: false,
    message: message,
    // Stack trace sirf development mode mein dikhayenge (Security reason)
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;