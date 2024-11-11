const activityModel = require("../models/activityModel");
const activityTicketModel= require("../models/activityTicketModel");
const userModel= require("../models/userModel");
const activityReviewModel= require("../models/activityReviewModel");

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
            return res.status(404).json({ message: "No activities found matching your criteria" });
        }

        res.status(200).json({ message: "Activities retrieved successfully", activities });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve activities", error: error.message });
    }
};
const getUnratedCompletedActivities = async (req, res) => {
    try {
        // Step 1: Verify that the user exists
        const tourist = await userModel.findById(req.user._id);
        if (!tourist) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Step 2: Retrieve past activity tickets
        const activityTickets = await activityTicketModel
            .find({ tourist: req.user._id, status: 'active' })
            .populate({
                path: 'activity',
                select: '_id name date', // Only select required fields
            });

        // Step 3: Ensure activities are populated and filter for past dates
        const pastActivities = activityTickets
            .filter(ticket => ticket.activity && ticket.activity.date && new Date(ticket.activity.date) < new Date());

        // Step 4: Retrieve rated activities by this tourist
        const ratedActivities = await activityReviewModel.find({ tourist: req.user._id }).select('activity');
        const ratedActivityIds = ratedActivities.map(review => review.activity.toString());

        // Step 5: Filter unrated activities
        const unratedActivities = pastActivities
            .filter(ticket => !ratedActivityIds.includes(ticket.activity._id.toString()))
            .map(ticket => ({
                activityId: ticket.activity._id,
                activityName: ticket.activity.name
            }));

        // Step 6: Check if there are unrated activities
        if (unratedActivities.length === 0) {
            return res.status(400).json({ message: 'No unrated completed activities to review' });
        }

        res.status(200).json({
            message: 'Unrated completed activities retrieved successfully',
            activities: unratedActivities
        });
    } catch (error) {
        console.error("Error retrieving unrated completed activities:", error);
        res.status(500).json({ message: "Couldn't retrieve unrated completed activities" });
    }
};

module.exports = {
    getFilteredActivities,
    getUnratedCompletedActivities
};
