const express = require("express");
const router = express.Router();
const uploadController = require("../Controllers/UploadController");

// Middlewares
const { protect, restrictTo } = require('../Middleware/AuthMiddleware');
const upload = require('../Middleware/UploadMiddleware'); // Optimized middleware

/**
 * @route   POST /api/v1/upload
 * @desc    Upload an image or video (Staff Only)
 * @access  Private (Admin/Reporter)
 */

// Sirf authorized staff hi media upload kar sake taaki storage safe rahe
router.post(
  "/", 
  protect, 
  restrictTo('admin', 'reporter'), 
  upload.single("file"), // Frontend FormData key: 'file'
  uploadController.uploadFile
);

module.exports = router;