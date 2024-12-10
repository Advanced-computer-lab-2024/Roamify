const activityModel = require("../models/activityModel");

const getFilteredActivities = async (req, res) => {
    try {
        // Extract query parameters for filtering, searching, and sorting
        const {
            minBudget,
            maxBudget,
            date,
            category,
            minRating,
            sortBy,
            sortOrder = "asc"
        } = req.query;

        // Build filter object
        let filter = {};

        // Filter by budget range
        if (minBudget || maxBudget) {
            filter.price = {};
            if (minBudget) filter.price.$gte = parseFloat(minBudget);
            if (maxBudget) filter.price.$lte = parseFloat(maxBudget);
        }

        // Filter by upcoming date
        if (date) {
            filter.date = { $gte: new Date(date) }; // Only future dates
        }

        // Filter by category (using category ID)
        if (category) {
            filter.category = category;
        }

        // Filter by minimum rating
        if (minRating) {
            filter.rating = { $gte: parseFloat(minRating) };
        }

        // Build sorting options
        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
        }

        // Execute the query with filtering and sorting
        const activities = await activityModel
            .find(filter)
            .sort(sortOptions)
            .populate("category", "name description") // Populate category details if needed
            .populate("tags", "name description"); // Populate tags if needed

        if (!activities.length) {
            return res.status(404).json({
                message: "No activities found matching your criteria"
            });
        }

        res.status(200).json({
            message: "Activities retrieved successfully",
            activities
        });
    } catch (error) {
        res.status(500).json({
            message: "An unexpected error occurred while retrieving activities. Please try again later.",
            error: error.message
        });
    }
};

module.exports = {
    getFilteredActivities
};
