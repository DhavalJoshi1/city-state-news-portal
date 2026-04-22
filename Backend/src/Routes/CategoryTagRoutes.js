const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/CategoryController');
const tagController = require('../Controllers/TagController');
const { protect, restrictTo } = require('../Middleware/AuthMiddleware');
const upload = require('../Middleware/UploadMiddleware');

// --- CATEGORY ROUTES ---
router.get('/category', categoryController.getCategories);
router.post('/category', protect, restrictTo('admin'), upload.single('image'), categoryController.createCategory);
router.patch('/category/:id', protect, restrictTo('admin'), upload.single('image'), categoryController.updateCategory);
router.delete('/category/:id', protect, restrictTo('admin'), categoryController.deleteCategory);

// --- TAG ROUTES ---
router.get('/tag', tagController.getTags);
router.post('/tag', protect, restrictTo('admin'), tagController.createTag);
router.patch('/tag/:id', protect, restrictTo('admin'), tagController.updateTag);
router.delete('/tag/:id', protect, restrictTo('admin'), tagController.deleteTag);

module.exports = router;