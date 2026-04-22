const express = require('express');
const router = express.Router();
const newsController = require('../Controllers/NewsController');

// Middlewares
const { protect, restrictTo } = require('../Middleware/AuthMiddleware');
const upload = require('../Middleware/UploadMiddleware'); 
const { validateObjectId } = require('../Middleware/ValidateMiddleware');

// --------------------------------------------------------
// 🌍 PUBLIC ROUTES (No Login Required)
// --------------------------------------------------------

router.get('/', newsController.getNews);
router.get('/post/:slug', newsController.getNewsBySlug);


// --------------------------------------------------------
// 🔒 STAFF ROUTES (Reporters & Admins)
// --------------------------------------------------------

router.use(protect); // Global protect: Iske niche sab login mangenge

router.get('/my-news', newsController.getMyNews);

/**
 * @route   POST /api/v1/news
 * @desc    Create news with image
 */
router.post(
  '/', 
  restrictTo('admin', 'reporter'), 
  upload.single('image'), 
  newsController.createNews
);

/**
 * @route   PATCH /api/v1/news/:id
 * @desc    Update news content or image
 */
router.patch(
  '/:id', 
  restrictTo('admin', 'reporter'), 
  validateObjectId, 
  upload.single('image'), 
  newsController.updateNews
);

/**
 * @route   DELETE /api/v1/news/:id
 */
router.delete(
  '/:id', 
  restrictTo('admin', 'reporter'), 
  validateObjectId, 
  newsController.deleteNews
);


// --------------------------------------------------------
// 👮 ADMIN ONLY ROUTES (Moderation & Stats)
// --------------------------------------------------------

router.get(
  '/admin/all', 
  restrictTo('admin'), 
  newsController.getAllNewsForAdmin
);

/**
 * @route   GET /api/v1/news/admin/stats
 * @desc    Get dashboard analytics (Total news, views, users)
 */
router.get(
  '/admin/stats', 
  restrictTo('admin'), 
  newsController.getAdminStats
);

/**
 * @route   PATCH /api/v1/news/:id/status
 * @desc    Approve, Reject, or Archive news
 */
router.patch(
  '/:id/status', 
  restrictTo('admin'), 
  validateObjectId, 
  newsController.updateNewsStatus
);

module.exports = router;