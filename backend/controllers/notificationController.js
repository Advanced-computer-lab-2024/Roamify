const notificationModel = require('../models/notificationModel')


const getNotifications = async (req, res) => {

    try {
        const notifications = await notificationModel.find({ user: req.user._id }).select('type message read -_id').sort({ read: 1, createdAt: -1 });

        if (notifications.length === 0) throw Error('you have no notifications yet')


        return res.status(200).json(notifications)

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { getNotifications }