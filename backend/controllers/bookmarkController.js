const touristModel = require('../models/touristModel')
const activityModel = require('../models/activityModel');
const itineraryModel = require('../models/itineraryModel');
const { default: mongoose } = require('mongoose');

const bookmarkActivity = async (req, res) => {
    try {
        const { activityId } = req.body;

        if (!activityId) {
            return res.status(400).json({ message: "Please choose an activity to bookmark." });
        }

        const tourist = await touristModel.findOne({ user: req.user._id });
        const activity = await activityModel.findById(activityId);

        if (!activity) {
            return res.status(400).json({ message: "Invalid activity selected." });
        }

        const exists = tourist.bookmarkedActivities.some(
            (a) => a.toString() === activityId
        );

        if (exists) {
            return res.status(400).json({ message: "Activity already bookmarked." });
        }

        tourist.bookmarkedActivities.push(activityId);
        await tourist.save();

        return res.status(200).json({ message: "Activity bookmarked successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred.", error: error.message });
    }
};
const bookmarkItinerary = async (req, res) => {
    try {
        const { itineraryId } = req.body;

        if (!itineraryId) {
            return res.status(400).json({ message: "Please choose an itinerary to bookmark." });
        }

        const tourist = await touristModel.findOne({ user: req.user._id });
        const itinerary = await itineraryModel.findById(itineraryId);

        if (!itinerary) {
            return res.status(400).json({ message: "Invalid itinerary selected." });
        }

        const exists = tourist.bookmarkedItineraries.some(
            (i) => i.toString() === itineraryId
        );

        if (exists) {
            return res.status(400).json({ message: "Itinerary already bookmarked." });
        }

        tourist.bookmarkedItineraries.push(itineraryId);
        await tourist.save();

        return res.status(200).json({ message: "Itinerary bookmarked successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred.", error: error.message });
    }
};
const getBookmarkedActivities = async (req, res) => {
    try {
        const tourist = await touristModel
            .findOne({ user: req.user._id })
            .populate("bookmarkedActivities");

        if (!tourist.bookmarkedActivities || tourist.bookmarkedActivities.length === 0) {
            return res.status(404).json({ message: "No bookmarked activities found." });
        }

        return res.status(200).json({
            message: "Bookmarked activities retrieved successfully.",
            bookmarkedActivities: tourist.bookmarkedActivities,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred.", error: error.message });
    }
};
const getBookmarkedItineraries = async (req, res) => {
    try {
        const tourist = await touristModel
            .findOne({ user: req.user._id })
            .populate("bookmarkedItineraries");

        if (!tourist.bookmarkedItineraries || tourist.bookmarkedItineraries.length === 0) {
            return res.status(404).json({ message: "No bookmarked itineraries found." });
        }

        return res.status(200).json({
            message: "Bookmarked itineraries retrieved successfully.",
            bookmarkedItineraries: tourist.bookmarkedItineraries,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred.", error: error.message });
    }
};
const removeBookmarkedActivity = async (req, res) => {
    try {
        const { activityId } = req.body;

        if (!activityId) {
            return res.status(400).json({ message: "Please choose an activity to unbookmark." });
        }

        const tourist = await touristModel.findOne({ user: req.user._id });
        const originalLength = tourist.bookmarkedActivities.length;

        tourist.bookmarkedActivities = tourist.bookmarkedActivities.filter(
            (a) => a.toString() !== activityId
        );

        if (originalLength === tourist.bookmarkedActivities.length) {
            return res.status(400).json({ message: "Activity was not bookmarked." });
        }

        await tourist.save();

        return res.status(200).json({ message: "Activity unbookmarked successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred.", error: error.message });
    }
};
const removeBookmarkedItinerary = async (req, res) => {
    try {
        const { itineraryId } = req.body;

        if (!itineraryId) {
            return res.status(400).json({ message: "Please choose an itinerary to unbookmark." });
        }

        const tourist = await touristModel.findOne({ user: req.user._id });
        const originalLength = tourist.bookmarkedItineraries.length;

        tourist.bookmarkedItineraries = tourist.bookmarkedItineraries.filter(
            (i) => i.toString() !== itineraryId
        );

        if (originalLength === tourist.bookmarkedItineraries.length) {
            return res.status(400).json({ message: "Itinerary was not bookmarked." });
        }

        await tourist.save();

        return res.status(200).json({ message: "Itinerary unbookmarked successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred.", error: error.message });
    }
};

module.exports = {
    bookmarkActivity,
    bookmarkItinerary,
    getBookmarkedActivities,
    getBookmarkedItineraries,
    removeBookmarkedActivity,
    removeBookmarkedItinerary,
};
