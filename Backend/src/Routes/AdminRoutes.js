const express = require('express');
const router = express.Router();
const newsController = require('../Controllers/NewsController');
const userController = require('../Controllers/UserController');
const { protect, restrictTo } = require('../Middleware/AuthMiddleware');

// Sabhi routes ke liye Login aur Admin Role zaroori hai
router.use(protect, restrictTo('admin'));

// News Management (Status Update: Approve/Reject/Archive)
router.patch('/news/status/:id', newsController.updateNewsStatus);

// User Management (Role Change & Block/Unblock)
router.get('/users', userController.getAllUsers);
router.patch('/users/privileges/:id', userController.updateUserPrivileges);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;