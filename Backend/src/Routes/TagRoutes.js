const express = require('express');
const router = express.Router();
const tagController = require('../Controllers/TagController');

// Middlewares
const { protect, restrictTo } = require('../Middleware/AuthMiddleware');
const ValidateMiddleware = require('../Middleware/ValidateMiddleware');
const { body } = require('express-validator');

// ✅ Validation Rules
const tagValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Tag name is required')
    .isLength({ min: 2, max: 20 }).withMessage('Tag must be 2-20 characters long')
];

// --------------------------------------------------------
// 🌍 PUBLIC ROUTES
// --------------------------------------------------------

// News post karte waqt ya search filters mein tags dikhane ke liye
router.get('/', tagController.getTags);


// --------------------------------------------------------
// 🔒 ADMIN ROUTES (Admin Only)
// --------------------------------------------------------

router.use(protect);
router.use(restrictTo('admin'));

// Create a new tag
router.post(
  '/', 
  tagValidation, 
  ValidateMiddleware.handleValidationErrors, 
  tagController.createTag
);

// Delete a tag
// (Note: Controller mein check laga hai ki agar tag news mein used hai toh delete nahi hoga)
router.delete(
  '/:id', 
  ValidateMiddleware.validateObjectId, 
  tagController.deleteTag
);

module.exports = router;