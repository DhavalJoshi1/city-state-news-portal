const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");

// Middlewares - Humne pehle 'restrictTo' aur 'protect' define kiye the
const { protect, restrictTo } = require("../Middleware/AuthMiddleware");
const ValidateMiddleware = require("../Middleware/ValidateMiddleware");

/**
 * @desc    Admin User Management
 * @access  Private (Admin Only)
 */

// Sabhi routes ke liye Login aur Admin hona zaroori hai
router.use(protect);
router.use(restrictTo('admin'));

// ✅ 1. Get all users (With Search, Role Filter & Pagination)
// Endpoint: GET /api/v1/users?role=reporter&search=john
router.get("/", userController.getAllUsers);

// ✅ 2. Update User Privileges (Change role or status)
// Endpoint: PATCH /api/v1/users/:id/privileges
router.patch(
  "/:id/privileges", 
  ValidateMiddleware.validateObjectId, 
  userController.updateUserPrivileges
);

// ✅ 3. Delete User
// Endpoint: DELETE /api/v1/users/:id
router.delete(
  "/:id", 
  ValidateMiddleware.validateObjectId, 
  userController.deleteUser
);

module.exports = router;