const express = require('express');
const router = express.Router();
const notificationController = require('../Controllers/NotificationController');
const { protect } = require('../Middleware/AuthMiddleware');

router.use(protect); // All notification routes require login

router.get('/', notificationController.getNotifications);
router.patch('/mark-as-read', notificationController.markAsRead);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
