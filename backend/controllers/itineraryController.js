const itineraryModel = require("../models/itineraryModel");
const itineraryTicketModel = require("../models/itineraryTicketModel");
const jwt = require("jsonwebtoken");

const getFilteredItineraries = async (req, res) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: "Authentication token is missing." });
        }

        try {
            const verified = jwt.verify(token, process.env.SECRET);
            req.user = verified;
        } catch (err) {
            return res.status(401).json({ message: "Invalid authentication token." });
        }

        const { role, _id: userId } = req.user || {};
        const {
            minBudget,
            maxBudget,
            date,
            preferences,
            language,
            sortBy,
            sortOrder = "asc",
            name,
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
            const preferenceTagIds = preferences.split(",").map((id) => id.trim());
            filter.preferenceTags = { $in: preferenceTagIds };
        }

        if (language) {
            filter.language = language;
        }

        if (name) {
            filter.name = { $regex: name, $options: "i" };
        }

        if (role !== "admin" && role) {
            filter.flag = { $ne: true };
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
                populate: { path: "category", select: "name" },
            })
            .populate({ path: "preferenceTags", select: "name description" });

        if (role === "admin") {
            return res.status(200).json({
                message: "Itineraries retrieved successfully.",
                itineraries,
            });
        }

        if (!itineraries.length) {
            return res.status(404).json({ message: "No itineraries found matching your criteria." });
        }

        const inactiveItineraries = itineraries.filter(
            (itinerary) => itinerary.status === "inactive"
        );

        if (role === "tourist") {
            const itineraryTickets = await itineraryTicketModel.find({
                tourist: userId,
                status: "active",
            });
            const ticketedItineraryIds = new Set(
                itineraryTickets.map((ticket) => ticket.itinerary.toString())
            );

            const uncommonItineraries = inactiveItineraries.filter(
                (itinerary) => !ticketedItineraryIds.has(itinerary._id.toString())
            );

            const uncommonItinerarySet = new Set(
                uncommonItineraries.map((itinerary) => itinerary._id.toString())
            );

            const filteredItineraries = itineraries.filter(
                (itinerary) =>
                    !uncommonItinerarySet.has(itinerary._id.toString())
            );

            if (!filteredItineraries.length) {
                return res.status(400).json({ message: "No available itineraries." });
            }

            return res.status(200).json({
                message: "Itineraries retrieved successfully.",
                itineraries: filteredItineraries,
            });
        }

        const activeItineraries = itineraries.filter(
            (itinerary) =>
                !inactiveItineraries.some(
                    (inactive) => inactive._id.toString() === itinerary._id.toString()
                )
        );

        if (!activeItineraries.length) {
            return res.status(404).json({ message: "No itineraries found matching your criteria." });
        }

        res.status(200).json({
            message: "Itineraries retrieved successfully.",
            itineraries: activeItineraries,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve itineraries.",
            error: error.message,
        });
    }
};

module.exports = { getFilteredItineraries };
