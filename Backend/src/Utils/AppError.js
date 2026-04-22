/**
 * @desc    Custom Error class for Operational Errors
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    
    // Ye property true hoti hai taaki globalErrorHandler pehchan sake 
    // ki ye humne khud generate ki hai (Operational Error).
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;