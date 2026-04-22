const express = require('express');
const router = express.Router();
const cityController = require('../Controllers/CityController');

// Middlewares
const { protect, restrictTo } = require('../Middleware/AuthMiddleware');
const ValidateMiddleware = require('../Middleware/ValidateMiddleware');
const { body } = require('express-validator');

// ✅ Validation Rules (City create/update ke liye)
const cityValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('City name is required')
    .isLength({ min: 2 }).withMessage('City name is too short'),
  body('state')
    .notEmpty().withMessage('State reference is required')
    .isMongoId().withMessage('Invalid State ID format')
];

// --------------------------------------------------------
// 🌍 PUBLIC ROUTES (Frontend Dropdowns aur Filters ke liye)
// --------------------------------------------------------

// Saari cities ya state-wise filter: /api/v1/cities?state=ID
router.get('/', cityController.getCities);


// --------------------------------------------------------
// 🔒 ADMIN ROUTES (Login & Admin Role Required)
// --------------------------------------------------------

router.use(protect);
router.use(restrictTo('admin'));

// Add new city
router.post(
  '/', 
  cityValidation, 
  ValidateMiddleware.handleValidationErrors, 
  cityController.createCity
);

// Update city details
router.put(
  '/:id', 
  ValidateMiddleware.validateObjectId, 
  cityValidation, 
  ValidateMiddleware.handleValidationErrors, 
  cityController.updateCity
);

// Delete city (Isme controller level par News-Check laga hua hai)
router.delete(
  '/:id', 
  ValidateMiddleware.validateObjectId, 
  cityController.deleteCity
);

module.exports = router;