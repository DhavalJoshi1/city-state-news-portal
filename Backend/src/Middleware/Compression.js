const compression = require('compression');

/**
 * ✅ Compression Middleware
 * Ye server-side responses ko compress karta hai taaki API faster load ho.
 */
module.exports = compression({
  // Level 6 ek "Sweet Spot" hai (Speed aur Compression size ka perfect balance)
  level: 6,

  // Threshold: Sirf 10KB se bade responses ko compress karega.
  // Chote responses ko compress karne mein CPU zyada kharch hota hai aur fayda kam hota hai.
  threshold: 10 * 1024, 

  // Filter function: Ye decide karta hai ki kaunsi request compress karni hai
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      // Agar frontend se specific instruction ho ki compress nahi karna
      return false;
    }
    // Baaki sabhi standard compressible types ke liye (JSON, HTML, Text)
    return compression.filter(req, res);
  }
});