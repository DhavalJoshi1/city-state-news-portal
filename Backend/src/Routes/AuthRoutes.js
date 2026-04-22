const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// Controllers & Middleware Imports
const authCtrl = require('../Controllers/AuthController');
const { protect } = require('../Middleware/AuthMiddleware'); 
const { handleValidationErrors } = require('../Middleware/ValidateMiddleware');

// ============================
// ✅ PUBLIC ROUTES
// ============================

router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name zaroori hai').isLength({ min: 3, max: 50 }).withMessage('Name 3 se 50 characters ka hona chahiye'),
    body('email').isEmail().normalizeEmail().withMessage('Ek valid email zaroori hai'),
    body('password').isLength({ min: 8 }).withMessage('Password kam se kam 8 chars ka ho'),
    body('role').optional().isIn(['user', 'reporter', 'admin']).withMessage('Invalid role type')
  ],
  handleValidationErrors, // ✅ Ensure no brackets () here
  authCtrl.register       // ✅ Ensure this is a function
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email provide karein'),
    body('password').notEmpty().withMessage('Password empty nahi ho sakta')
  ],
  handleValidationErrors,
  authCtrl.login
);

router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Valid email zaroori hai reset ke liye')],
  handleValidationErrors,
  authCtrl.forgotPassword
);

router.patch(
  '/reset-password/:token', 
  [
    body('newPassword').isLength({ min: 8 }).withMessage('Naya password kam se kam 8 chars ka ho')
  ],
  handleValidationErrors,
  authCtrl.resetPassword
);

router.post('/verify-email', authCtrl.verifyEmail);

// ============================
// 🔒 PROTECTED ROUTES
// ============================

router.use(protect); // Middleware injection

router.get('/profile', authCtrl.getProfile);
router.put('/profile', authCtrl.updateProfile);

router.patch(
  '/change-password',
  [
    body('currentPassword').notEmpty().withMessage('Purana password zaroori hai'),
    body('newPassword').isLength({ min: 8 }).withMessage('Naya password minimum 8 chars ka ho')
  ],
  handleValidationErrors,
  authCtrl.changePassword
);

router.post('/logout', authCtrl.logout);

module.exports = router;