const Itinerary = require('../models/ItineraryModel.js');

const filterUpcomingItineraries = async (req, res) => {
    try {
        const { budget, date, preference, language } = req.query;

        const today = new Date();
        const filter = {
            price: { $lte: budget ? Number(budget) : Infinity }, 
        };

       
        if (preference) {
            filter.preference = preference; 
        }

        if (language) {
            filter.language = language; 
        }

        
        if (date) {
            const requestedDate = new Date(date);
            requestedDate.setHours(0, 0, 0, 0); 
            const nextDay = new Date(requestedDate);
            nextDay.setDate(nextDay.getDate() + 1);

            filter.availableDates = { $elemMatch: { $gte: requestedDate, $lt: nextDay } }; 
        } else {
            filter.availableDates = { $elemMatch: { $gte: today } }; 
        }

        const upcomingItineraries = await Itinerary.find(filter);

        return res.status(200).json(upcomingItineraries);
    } catch (error) {
        return res.status(500).json({ message: 'Error occurred', error: error.message });
    }
};

module.exports = { filterUpcomingItineraries };
