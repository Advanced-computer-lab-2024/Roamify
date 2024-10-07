const itinerary = require('../models/ItineraryModel.js');
const activity = require('../models/activityModel.js');

const getSortedUpcomingActivitesItinerary = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const { sortBy, sortOrder = 'asc' } = req.query; 

        const validSortFields = ['price', 'rating'];
        if (!validSortFields.includes(sortBy)) {
            return res.status(400).json({ message: `Invalid sortBy field. Must be one of: ${validSortFields.join(', ')}` });
        }

        
        const order = sortOrder === 'desc' ? -1 : 1;

        const upcomingActivites = await activity.find({ date: { $gte: today } })
            .sort({ [sortBy]: order });

        const upcomingItineries = await itinerary.find({
            availableDates: { $elemMatch: { $gte: today } }
        }).sort({ [sortBy]: order });

        // Prepare the results
        const results = {
            upcomingActivites,
            upcomingItineries
        };

        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ message: 'Error occurred', error: error.message });
    }
};

module.exports = { getSortedUpcomingActivitesItinerary };