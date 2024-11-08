const Place = require("../models/placeModel");

const getFilteredPlaces = async (req, res) => {
    try {
        const {
            name,
            minTicketPrice,
            maxTicketPrice,
            type,
            tags,
            sortBy,
            sortOrder = "asc",
            locationName,
            priceType = "Native" // Default to "Native" if not specified
        } = req.query;

        let filter = {};

        // Conditional filter for ticket price based on priceType (Native, Foreigner, Student)
        if (["Native", "Foreigner", "Student"].includes(priceType)) {
            const priceField = `ticketPrice.${priceType}`;

            if (minTicketPrice || maxTicketPrice) {
                filter[priceField] = {};
                if (minTicketPrice) filter[priceField].$gte = parseFloat(minTicketPrice);
                if (maxTicketPrice) filter[priceField].$lte = parseFloat(maxTicketPrice);
            }
        } else if (minTicketPrice || maxTicketPrice) {
            // Return an error if priceType is invalid and min/max prices are provided
            return res.status(400).json({ message: "Invalid priceType. Use 'Native', 'Foreigner', or 'Student'." });
        }

        // Filter by type (e.g., museum, historical_site)
        if (type) {
            filter.type = type;
        }

        if (name) filter.name = name
        // Filter by tags (assumes tags are comma-separated in the query string)
        if (tags) {
            const tagIds = tags.split(",").map(id => id.trim());
            filter.tags = { $in: tagIds };
        }

        // Filter by location name
        if (locationName) {
            filter["location.name"] = locationName;
        }

        // Sorting options
        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
        }

        // Execute the query, defaulting to no filter if the filter object is empty
        const places = await Place.find(filter)
            .sort(sortOptions)
            .populate({
                path: "tags",
                select: "name description" // Populate the tags with specific fields
            })
            .populate({
                path: "tourismGovernorId",
                select: "name email" // Populate the tourism governor with specific fields
            });

        if (!places.length) {
            return res.status(404).json({ message: "No places found matching your criteria" });
        }

        res.status(200).json({ message: "Places retrieved successfully", places });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve places", error: error.message });
    }
};

module.exports = {
    getFilteredPlaces
};
