const { default: mongoose } = require('mongoose');
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

const markAsRead = async (req, res) => {
    try {
        if (!req.body.notificationId) return res.status(400).json({ message: 'please choose a notification to read' })

        const nId = new mongoose.Types.ObjectId(req.body.notificationId)
        const n = await notificationModel.findById(nId)

        if (n.user.toString() !== req.user._id.toString()) return res.status(400).json({ message: 'not owner of this notification' })

        n.read = true;
        await n.save()
        return res.status(200).json({ message: 'read notification successfully' })


    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


module.exports = { getNotifications, markAsRead }