const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByAuthor,
  togglePublish
} = require('../Controllers/ArticleController');

// Humne pehle authMiddleware mein 'protect' aur 'restrictTo' banaya tha
const { protect, restrictTo } = require('../Middleware/AuthMiddleware');
const ValidateMiddleware = require('../Middleware/ValidateMiddleware');
const upload = require('../Middleware/UploadMiddleware'); // Image support ke liye

// ✅ Article Validation Rules
const articleValidation = [
  body('title').trim().isLength({ min: 5, max: 200 }).withMessage('Title must be 5-200 characters'),
  body('content').trim().isLength({ min: 50 }).withMessage('Content must be at least 50 characters'),
  body('category').isMongoId().withMessage('Valid category ID required'),
  body('city').isMongoId().withMessage('Valid city ID required')
];

// --- PUBLIC ROUTES ---
router.get('/', getArticles);
router.get('/:id', ValidateMiddleware.validateObjectId, getArticleById);
router.get('/author/:authorId', ValidateMiddleware.validateObjectId, getArticlesByAuthor);

// --- PROTECTED ROUTES (Login Required) ---
router.use(protect);

// Create Article (With Image Upload support)
router.post(
  '/', 
  restrictTo('admin', 'reporter'), 
  upload.single('image'), // Feature image ke liye
  articleValidation, 
  ValidateMiddleware.handleValidationErrors, 
  createArticle
);

// Update Article
router.put(
  '/:id', 
  ValidateMiddleware.validateObjectId, 
  articleValidation, 
  ValidateMiddleware.handleValidationErrors, 
  updateArticle
);

// Delete Article
router.delete('/:id', ValidateMiddleware.validateObjectId, deleteArticle);

// --- ADMIN ONLY ROUTES ---
// Status toggle (Publish/Unpublish)
router.patch(
  '/:id/toggle-publish', 
  restrictTo('admin'), 
  ValidateMiddleware.validateObjectId, 
  togglePublish
);

module.exports = router;