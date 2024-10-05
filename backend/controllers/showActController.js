// controllers/showActController.js
const activity = require('../models/activityModel.js');

const showallActivites = async (req, res) => {
    try {
        const activities = await activity.find({}); // Fetch all activities
        return res.status(200).json(activities);
    } catch (error) {
        return res.status(500).json({ message: 'Error occurred', error: error.message });
    }
};

// Ensure you are exporting the function properly
module.exports = { showallActivites };
