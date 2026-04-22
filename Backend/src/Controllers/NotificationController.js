const Notification = require('../Models/Notification');
const ResponseHandler = require('../Utils/ResponseHandler');

exports.getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({ user: req.user.id })
            .sort('-createdAt')
            .limit(20);
        ResponseHandler.success(res, 'Notifications fetched', { notifications });
    } catch (error) {
        next(error);
    }
};

exports.markAsRead = async (req, res, next) => {
    try {
        await Notification.updateMany(
            { user: req.user.id, isRead: false },
            { isRead: true }
        );
        ResponseHandler.success(res, 'All notifications marked as read');
    } catch (error) {
        next(error);
    }
};

exports.deleteNotification = async (req, res, next) => {
    try {
        await Notification.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        ResponseHandler.success(res, 'Notification deleted');
    } catch (error) {
        next(error);
    }
};
