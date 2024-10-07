const activity = require('../models/activityModel.js');

const filterUpcomingActivites = async (req, res) => {
    try {
        const { budget, date, category, rating } = req.query;

        const today = new Date();
        const filter = {
            date: {} 
        };

        if (date) {
            const requestedDate = new Date(date);
            if (!isNaN(requestedDate)) {
                const startOfDay = new Date(requestedDate);
                const endOfDay = new Date(requestedDate);
                endOfDay.setHours(23, 59, 59, 999);
                filter.date = { $gte: startOfDay, $lte: endOfDay };
            }
        } else {
            filter.date = { $gte: today };
        }

       
        if (budget) {
            const budgetValue = Number(budget);
            if (!isNaN(budgetValue)) {
                filter.price = { $lte: budgetValue };  
            }
        }

        if (category) {
            filter.category = category;
        }
        if (rating) {
            const ratingValue = Number(rating);
            console.log("Rating filter value:", ratingValue); 
            
            if (!isNaN(ratingValue)) {
                filter.rating = { $gte: ratingValue };
            }
        }

        console.log(filter);  

        
        const upcomingActivites = await activity.find(filter);

        return res.status(200).json(upcomingActivites);
    } catch (error) {
        return res.status(500).json({ message: 'Error occurred', error: error.message });
    }
};

module.exports = { filterUpcomingActivites };
