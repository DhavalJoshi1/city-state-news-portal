const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  toggleLike,
  reportComment,
  getReportedComments
} = require('../Controllers/CommentController');

// Humne pehle authMiddleware mein 'protect' aur 'restrictTo' define kiya tha
const { protect, restrictTo } = require('../Middleware/AuthMiddleware');
const ValidateMiddleware = require('../Middleware/ValidateMiddleware');

// ✅ 1. Validation Rules
const commentValidation = [
  body('text').trim().isLength({ min: 1, max: 1000 }).withMessage('Comment must be 1-1000 characters'),
  body('contentId').isMongoId().withMessage('Valid content ID required'),
  body('contentType').optional().isIn(['news', 'article']).withMessage('Invalid content type'),
  body('parentComment').optional().isMongoId().withMessage('Invalid parent comment ID')
];

const reportValidation = [
  body('reason').optional().trim().isLength({ max: 500 }).withMessage('Reason cannot exceed 500 characters')
];

// --------------------------------------------------------
// 🌍 PUBLIC ROUTES
// --------------------------------------------------------

// Get comments for a specific news/article
router.get('/:contentType/:contentId', getComments);


// --------------------------------------------------------
// 🔒 PROTECTED ROUTES (Login Required)
// --------------------------------------------------------

router.use(protect);

// Create Comment or Reply
router.post(
  '/', 
  commentValidation, 
  ValidateMiddleware.handleValidationErrors, 
  createComment
);

// Update Comment
router.put(
  '/:id', 
  ValidateMiddleware.validateObjectId, 
  [body('text').trim().notEmpty()], 
  ValidateMiddleware.handleValidationErrors, 
  updateComment
);

// Delete Comment (Soft or Hard delete is handled in controller)
router.delete('/:id', ValidateMiddleware.validateObjectId, deleteComment);

// Interaction: Like & Report
router.post('/:id/like', ValidateMiddleware.validateObjectId, toggleLike);
router.post('/:id/report', ValidateMiddleware.validateObjectId, reportValidation, ValidateMiddleware.handleValidationErrors, reportComment);


// --------------------------------------------------------
// 👮 ADMIN ROUTES (Admin Only)
// --------------------------------------------------------

router.get(
  '/admin/reported', 
  restrictTo('admin'), 
  getReportedComments
);

module.exports = router;