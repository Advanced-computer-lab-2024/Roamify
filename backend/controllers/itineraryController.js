const itineraryModel = require("../models/itineraryModel");
const getFilteredItineraries = async (req, res) => {
    try {
        const {
            minBudget,
            maxBudget,
            date,
            preferences,
            language,
            sortBy,
            sortOrder = "asc"
        } = req.query;

        let filter = {};

        if (minBudget || maxBudget) {
            filter.price = {};
            if (minBudget) filter.price.$gte = parseFloat(minBudget);
            if (maxBudget) filter.price.$lte = parseFloat(maxBudget);
        }

        if (date) {
            filter.availableDates = { $gte: new Date(date) };
        }

        if (preferences) {
            const preferenceTagIds = preferences.split(",").map(id => id.trim()); // Remove whitespace from each ID
            filter.preferenceTags = { $in: preferenceTagIds };
        }

        if (language) {
            filter.language = language;
        }

        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
        }

        const itineraries = await itineraryModel
            .find(filter)
            .sort(sortOptions)
            .populate({
                path: "activities",
                select: "name price rating",
                populate: { path: "category", select: "name" }
            })
            .populate({
                path: "preferenceTags",
                select: "name description"
            });

        if (!itineraries.length) {
            return res.status(404).json({ message: "No itineraries found matching your criteria" });
        }

        res.status(200).json({ message: "Itineraries retrieved successfully", itineraries });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve itineraries", error: error.message });
    }
};




module.exports = {
    getFilteredItineraries
};