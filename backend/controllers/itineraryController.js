const itineraryModel = require("../models/itineraryModel");
const touristModel = require("../models/touristModel");
const itineraryTicketModel = require("../models/itineraryTicketModel");
const jwt = require("jsonwebtoken");

const getFilteredItineraries = async (req, res) => {
    try {
        const token = req.cookies?.token; // Get token from cookies
        if (!token) {
            req.user = null;
        }

        else {

            try {

                const verified = jwt.verify(token, process.env.SECRET); // Verify token
                console.log("Decoded JWT:", verified);


                req.user = verified; // Store decoded token payload in req.user
            } catch (err) {
                console.error("Token verification failed:", err);
                res.status(401).json({ message: "Invalid token" });
            }
        }

        let role = "";
        if (req.user)
            role = req.user.role;



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

        // Add the condition to exclude itineraries with flag=true
        if (role !== "admin" && role !== "")
            filter.flag = { $ne: true };

        let itineraries = await itineraryModel
            .find(filter)
            .sort(sortOptions)
            .populate({ path: "activities", select: "name price rating", populate: { path: "category", select: "name" } }).populate({ path: "preferenceTags", select: "name description" });

        console.log(itineraries);

        if (!itineraries.length) {
            return res.status(404).json({ message: "No itineraries found matching your criteria" });
        }

        //get all inactive itineraries
        const inactiveItineraries = itineraries.filter(itinerary => itinerary.status === "inactive");


        if (role === "tourist") {
            const itineraryTickets = await itineraryTicketModel.find({ tourist: req.user._id, status: 'active' })
            // Convert itinerary IDs from itineraryTickets to a Set for efficient lookup
            const ticketedItineraryIds = new Set(itineraryTickets.map(ticket => ticket.itinerary.toString()));

            const uncommonItineraries = inactiveItineraries.filter(itinerary =>
                !ticketedItineraryIds.has(itinerary._id.toString())
            );

            const uncommonItinerarySet = new Set(uncommonItineraries.map(itinerary => itinerary._id.toString()));

            // Step 2: Filter the itineraries array to exclude the uncommon itineraries
            const filteredItineraries = itineraries.filter(itinerary =>
                !uncommonItinerarySet.has(itinerary._id.toString())
            );



            if (filteredItineraries.length === 0) return res.status(400).json({ message: 'no available itineraries' })
            return res.status(200).json(filteredItineraries)







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




module.exports = {
    getFilteredItineraries
};