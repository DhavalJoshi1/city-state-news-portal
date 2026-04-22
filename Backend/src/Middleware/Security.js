const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

/**
 * 1. HELMET: Secure Express apps by setting various HTTP headers
 */
exports.securityHeaders = helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" } // Images load hone ke liye
});

/**
 * 2. CORS: Frontend access allow karne ke liye
 */
exports.corsSetup = cors({
    // FRONTEND_URL .env mein set karein (e.g., http://localhost:5173)
    origin: process.env.FRONTEND_URL || true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
});

/**
 * 3. RATE LIMITER: Brute-force attacks se bachane ke liye
 */
exports.apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 500, // Development ke liye 500 requests theek hain
    message: {
        success: false,
        message: "Too many requests. Please try again after 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false,
});