const Itinerary = require('../models/ItineraryModel.js');
const activity =require('../models/activityModel.js');

const filterUpcomingItineraries = async (req, res) => {
    try {
        const { budget, date, preference, language } = req.query;

        const today = new Date();
        const filter = {
            price: { $lte: budget ? Number(budget) : Infinity }, 
            availableDates: { $elemMatch: { $gte: today } }
        };
        if (preference) {
            filter.preference = preference; 
        }
        if (language) {
            filter.language = language; 
        }
        if (date) {
            const requestedDate = new Date(date);
            if (!isNaN(requestedDate)) {
                filter.availableDates = { $elemMatch: { $gte: requestedDate } }; 
            }
        }

        const upcomingItineraries = await Itinerary.find(filter);

        return res.status(200).json(upcomingItineraries);
    } catch (error) {
        return res.status(500).json({ message: 'Error occurred', error: error.message });
    }
};








module.exports = { filterUpcomingItineraries };

