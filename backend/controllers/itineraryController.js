const itineraryModel = require("../models/itineraryModel");
const userModel = require("../models/userModel");
const itineraryTicketModel = require("../models/itineraryTicketModel");
const jwt = require("jsonwebtoken");

const getFilteredItineraries = async (req, res) => {
    try {
        // Step 1: Token Verification
        const token = req.cookies?.token;
        if (!token) {
            req.user = null;
        } else {
            try {
                const verified = jwt.verify(token, process.env.SECRET);
                console.log("Decoded JWT:", verified);
                req.user = verified;
            } catch (err) {
                console.error("Token verification failed:", err);
                return res.status(401).json({ message: "Invalid token" });
            }
        }

        // Step 2: Role Identification
        let role = req.user ? req.user.role : "";

        // Step 3: Extract Query Parameters
        const {
            minBudget,
            maxBudget,
            date,
            preferences,
            language,
            sortBy,
            sortOrder = "asc",
            name
        } = req.query;

        // Step 4: Initial Filter Object
        let filter = {};

        // Step 5: Apply Budget Filter
        if (minBudget || maxBudget) {
            filter.price = {};
            if (minBudget) filter.price.$gte = parseFloat(minBudget);
            if (maxBudget) filter.price.$lte = parseFloat(maxBudget);
        }

        // Step 6: Apply Date Filter
        if (date) {
            filter.availableDates = { $elemMatch: { $gte: new Date(date) } };
        }

        // Step 7: Apply Preferences Filter
        if (preferences) {
            const preferenceTagIds = preferences.split(",").map(id => id.trim());
            filter.preferenceTags = { $in: preferenceTagIds };
        }

        // Step 8: Apply Language Filter
        if (language) {
            filter.language = language;
        }

        // Step 9: Apply Name Search
        if (name) {
            filter.name = { $regex: name, $options: "i" }; // Case-insensitive search
        }

        // Step 10: Apply Flag Condition for Non-Admins
        if (role !== "admin" && role !== "") {
            filter.flag = { $ne: true };
        }

        console.log("Final Filter Applied:", filter);

        // Step 11: Sorting Options
        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
        }

        // Step 12: Query Database
        let itineraries = await itineraryModel
            .find(filter)
            .sort(sortOptions)
            .populate({ path: "activities", select: "name price rating", populate: { path: "category", select: "name" } })
            .populate({ path: "preferenceTags", select: "name description" });

        console.log("Itineraries after Query:", itineraries.length);

        // Step 13: Check for Admin Role
        if (role === 'admin') {
            return res.status(200).json(itineraries);
        }

        // Step 14: Check for No Results
        if (!itineraries.length) {
            return res.status(404).json({ message: "No itineraries found matching your criteria" });
        }

        // Step 15: Filter Inactive Itineraries
        let inactiveItineraries = itineraries.filter(itinerary => itinerary.status === "inactive");
        console.log("Inactive Itineraries:", inactiveItineraries.length);

        // Step 16: Tourist-Specific Filtering (Temporarily Removed for Debugging)
        if (role === "tourist") {
            const itineraryTickets = await itineraryTicketModel.find({ tourist: req.user._id, status: 'active' });
            const ticketedItineraryIds = new Set(itineraryTickets.map(ticket => ticket.itinerary.toString()));

            const uncommonItineraries = inactiveItineraries.filter(itinerary =>
                !ticketedItineraryIds.has(itinerary._id.toString())
            );

            const uncommonItinerarySet = new Set(uncommonItineraries.map(itinerary => itinerary._id.toString()));

            itineraries = itineraries.filter(itinerary =>
                !uncommonItinerarySet.has(itinerary._id.toString())
            );

            console.log("Filtered Itineraries for Tourist:", itineraries.length);

            if (itineraries.length === 0) {
                return res.status(400).json({ message: 'No available itineraries' });
            }
            return res.status(200).json(itineraries);
        }

        // Step 17: Non-Tourist Filtering of Active Itineraries
        const updatedItineraries = itineraries.filter(
            itinerary => !inactiveItineraries.some(
                inactiveItinerary => inactiveItinerary._id.toString() === itinerary._id.toString()
            )
        );

        console.log("Updated Itineraries after Inactive Filtering:", updatedItineraries.length);

        if (!updatedItineraries.length) {
            return res.status(404).json({ message: "No itineraries found matching your criteria" });
        }

        // Step 18: Final Response
        res.status(200).json({ message: "Itineraries retrieved successfully", updatedItineraries });
    } catch (error) {
        console.error("Error retrieving itineraries:", error); // Log the error for debugging
        res.status(500).json({ message: "Failed to retrieve itineraries", error: error.message });
    }
};

module.exports = { getFilteredItineraries}