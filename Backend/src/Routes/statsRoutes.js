const express = require('express');
const router = express.Router();
const statsController = require('../Controllers/StatsController');

// Middleware imports
const { protect, restrictTo } = require('../Middleware/AuthMiddleware');

/**
 * @desc    Admin Dashboard Analytics & Statistics
 * @access  Private (Admin Only)
 */

// Global Middleware for this router: Sabhi stats routes sirf admin access kar payega
router.use(protect);
router.use(restrictTo('admin'));

// ✅ Get Overall Dashboard Stats (Total News, Users, Views, etc.)
router.get('/dashboard', statsController.getDashboardStats);

/**
 * Future-proofing: Aap yahan aur bhi specific analytics add kar sakte hain
 * Jaise ki Monthly Growth, Revenue (agar ads hain), ya User Activity.
 */
// router.get('/analytics/growth', statsController.getGrowthStats);

module.exports = router;