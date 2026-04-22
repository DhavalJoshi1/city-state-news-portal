const express = require('express');
const router = express.Router();
const adController = require('../Controllers/AdController');
const { protect, restrictTo } = require('../Middleware/AuthMiddleware');
const upload = require('../Middleware/UploadMiddleware');

// Public Route (Portal ke liye)
router.get('/active', adController.getActiveAds);

// Admin Routes
router.get('/', protect, restrictTo('admin'), adController.getAds);

router.post(
  '/', 
  protect, 
  restrictTo('admin'), 
  upload.single('image'), 
  adController.createAd
);

router.patch('/:id/status', protect, restrictTo('admin'), adController.toggleAdStatus);

router.delete('/:id', protect, restrictTo('admin'), adController.deleteAd);

module.exports = router;