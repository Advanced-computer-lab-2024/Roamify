const itineraryModel = require("../models/itineraryModel");
const userModel = require("../models/userModel");
const itineraryTicketModel = require("../models/itineraryTicketModel");
const itineraryReviewModel = require("../models/itineraryReviewModel");
const jwt = require("jsonwebtoken");

const getFilteredItineraries = async (req, res) => {
    try {
        const token = req.cookies?.token; // Get token from cookies
        if (!token) {
            req.user = null;
        } else {
            try {
                const verified = jwt.verify(token, process.env.SECRET); // Verify token
                console.log("Decoded JWT:", verified);
                req.user = verified; // Store decoded token payload in req.user
            } catch (err) {
                console.error("Token verification failed:", err);
                return res.status(401).json({ message: "Invalid token" });
            }
        }

        let role = req.user ? req.user.role : "";

        const {
            minBudget,
            maxBudget,
            date,
            preferences,
            language,
            sortBy,
            sortOrder = "asc",
            name // New parameter for name search
        } = req.query;

        let filter = {};

        if (minBudget || maxBudget) {
            filter.price = {};
            if (minBudget) filter.price.$gte = parseFloat(minBudget);
            if (maxBudget) filter.price.$lte = parseFloat(maxBudget);
        }

        if (date) {
            filter.availableDates = { $elemMatch: { $gte: new Date(date) } };
        }

        if (preferences) {
            const preferenceTagIds = preferences.split(",").map(id => id.trim());
            filter.preferenceTags = { $in: preferenceTagIds };
        }

        if (language) {
            filter.language = language;
        }

        // Add name search with partial matching
        if (name) {
            filter.name = { $regex: name, $options: "i" }; // Case-insensitive search
        }

        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
        }

        // Exclude itineraries with flag=true if the user is not an admin
        if (role !== "admin" && role !== "")
            filter.flag = { $ne: true };

        let itineraries = await itineraryModel
            .find(filter)
            .sort(sortOptions)
            .populate({ path: "activities", select: "name price rating", populate: { path: "category", select: "name" } })
            .populate({ path: "preferenceTags", select: "name description" });

        if (role === 'admin') {
            return res.status(200).json(itineraries);
        }

        if (!itineraries.length) {
            return res.status(404).json({ message: "No itineraries found matching your criteria" });
        }

        let inactiveItineraries = itineraries.filter(itinerary => itinerary.status === "inactive");

        if (role === "tourist") {
            const itineraryTickets = await itineraryTicketModel.find({ tourist: req.user._id, status: 'active' });
            const ticketedItineraryIds = new Set(itineraryTickets.map(ticket => ticket.itinerary.toString()));

            const uncommonItineraries = inactiveItineraries.filter(itinerary =>
                !ticketedItineraryIds.has(itinerary._id.toString())
            );

            const uncommonItinerarySet = new Set(uncommonItineraries.map(itinerary => itinerary._id.toString()));

            const filteredItineraries = itineraries.filter(itinerary =>
                !uncommonItinerarySet.has(itinerary._id.toString())
            );

            if (filteredItineraries.length === 0) return res.status(400).json({ message: 'No available itineraries' });
            return res.status(200).json(filteredItineraries);
        }

        const updatedItineraries = itineraries.filter(
            itinerary => !inactiveItineraries.some(
                inactiveItinerary => inactiveItinerary._id.toString() === itinerary._id.toString()
            )
        );

        if (!updatedItineraries.length) {
            return res.status(404).json({ message: "No itineraries found matching your criteria" });
        }

        res.status(200).json({ message: "Itineraries retrieved successfully", updatedItineraries });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve itineraries", error: error.message });
    }
};
const getUnratedCompletedItineraries = async (req, res) => {
    try {
        // Step 1: Verify that the user exists
        const tourist = await userModel.findById(req.user._id);
        if (!tourist) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Step 2: Retrieve itinerary tickets with past dates
        const itineraryTickets = await itineraryTicketModel
            .find({ tourist: req.user._id, status: 'active', date: { $lt: new Date() } }) // Only tickets with past dates
            .populate('itinerary', '_id name'); // Populate only the itinerary id and name

        // Step 3: Get all rated itineraries by this tourist
        const ratedItineraries = await itineraryReviewModel.find({ tourist: req.user._id }).select('itinerary');
        const ratedItineraryIds = ratedItineraries.map(review => review.itinerary.toString());

        // Step 4: Filter out itineraries that are already rated
        const unratedItineraries = itineraryTickets
            .filter(ticket => !ratedItineraryIds.includes(ticket.itinerary._id.toString()))
            .map(ticket => ({
                itineraryId: ticket.itinerary._id,
                itineraryName: ticket.itinerary.name
            }));

        // Step 5: Check if there are unrated itineraries
        if (unratedItineraries.length === 0) {
            return res.status(400).json({ message: 'No unrated completed itineraries to review' });
        }

        res.status(200).json({
            message: 'Unrated completed itineraries retrieved successfully',
            itineraries: unratedItineraries
        });
    } catch (error) {
        console.error("Error retrieving unrated completed itineraries:", error);
        res.status(500).json({ message: "Couldn't retrieve unrated completed itineraries" });
    }
};


module.exports = { getFilteredItineraries, getUnratedCompletedItineraries }