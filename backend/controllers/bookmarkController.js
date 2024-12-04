const touristModel = require('../models/touristModel')
const activityModel = require('../models/activityModel');
const itineraryModel = require('../models/itineraryModel');
const { default: mongoose } = require('mongoose');


const bookmarkActivity = async (req, res) => {
    try {
        if (!req.body.activityId) return res.status(400).json({ message: 'Choose an activity to bookmark' })
        const tourist = await touristModel.findOne({ user: req.user._id });

        const activityId = new mongoose.Types.ObjectId(req.body.activityId)
        const activity = await activityModel.findById(activityId)
        if (!activity) return res.status(400).json({ message: 'you are choosing an invalid activity' })

        const exists = tourist.bookmarkedActivities.some(a =>
            a.toString() === activityId.toString()
        )

        if (exists) return res.status(400).json({ message: 'activity already bookmarked' })

        tourist.bookmarkedActivities.push(activityId)
        await tourist.save()

        return res.status(200).json({ message: 'bookmarked activity successfully' })



    }
    catch (error) {

        return res.status(500).json({ message: error.message })

    }
}


const bookmarkItinerary = async (req, res) => {
    try {
        if (!req.body.itineraryId) return res.status(400).json({ message: 'Choose an itinerary to bookmark' })
        const tourist = await touristModel.findOne({ user: req.user._id });

        const itineraryId = new mongoose.Types.ObjectId(req.body.itineraryId)
        const itinerary = await itineraryModel.findById(itineraryId)
        if (!itinerary) return res.status(400).json({ message: 'you are choosing an invalid itinerary' })

        const exists = tourist.bookmarkedItineraries.some(a =>
            a.toString() === itineraryId.toString()
        )

        if (exists) return res.status(400).json({ message: 'itinerary already bookmarked' })
        tourist.bookmarkedItineraries.push(itineraryId)
        await tourist.save()

        return res.status(200).json({ message: 'bookmarked itinerary successfully' })



    }
    catch (error) {

        return res.status(500).json({ message: error.message })

    }
}

const getBookmarkedActivities = async (req, res) => {
    try {

        const tourist = await touristModel.findOne({ user: req.user._id }).populate('bookmarkedActivities')

        return tourist.bookmarkedActivities.length === 0 ? res.status(400).json({ message: 'no bookmarked activities yet' }) : res.status(200).json({ bookmarkedActivities: tourist.bookmarkedActivities })

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const getBookmarkedItineraries = async (req, res) => {
    try {

        const tourist = await touristModel.findOne({ user: req.user._id }).populate('bookmarkedItineraries')

        return tourist.bookmarkedItineraries.length === 0 ? res.status(400).json({ message: 'no bookmarked itineraries yet' }) : res.status(200).json(tourist.bookmarkedItineraries)

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const removeBookmarkedActivity = async (req, res) => {
    try {



        if (!req.body.activityId) return res.status(400).json({ message: 'please choose an activity to unbookmark' })

        const activityId = new mongoose.Types.ObjectId(req.body.activityId)

        const activity = await activityModel.findById(activityId)

        if (!activity) return res.status(400).json({ message: 'please choose a valid activity to unbookmark' })

        const tourist = await touristModel.findOne({ user: req.user._id })

        const originalLength = tourist.bookmarkedActivities.length

        tourist.bookmarkedActivities = tourist.bookmarkedActivities.filter(a => a.toString() !== activityId.toString())

        await tourist.save()

        return originalLength !== tourist.bookmarkedActivities.length ? res.status(200).json({ message: 'book mark removed successfully' }) : res.status(400).json({ message: 'this activity was not bookmarked' })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}
const removeBookmarkedItinerary = async (req, res) => {
    try {

        if (!req.body.itineraryId) return res.status(400).json({ message: 'please choose an itinerary to unbookmark' })

        const itineraryId = new mongoose.Types.ObjectId(req.body.itineraryId)

        const itinerary = await itineraryModel.findById(itineraryId)

        if (!itinerary) return res.status(400).json({ message: 'please choose a valid itinerary to unbookmark' })

        const tourist = await touristModel.findOne({ user: req.user._id })

        const originalLength = tourist.bookmarkedItineraries.length

        tourist.bookmarkedItineraries = tourist.bookmarkedItineraries.filter(i => i.toString() !== itineraryId.toString())

        await tourist.save()

        return originalLength !== tourist.bookmarkedItineraries.length ? res.status(200).json({ message: 'book mark removed successfully' }) : res.status(400).json({ message: 'this itinerary was not bookmarked' })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    bookmarkActivity,
    bookmarkItinerary,
    getBookmarkedActivities,
    getBookmarkedItineraries,
    removeBookmarkedActivity,
    removeBookmarkedItinerary
}
