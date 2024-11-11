const userModel= require('../models/userModel');
const tourGuideReviewModel=require("../models/tourGuideReviewModel");
const itineraryTicketModel=require("../models/itineraryTicketModel");
const itineraryReviewModel= require("../models/itineraryReviewModel");
const activityTicketModel= require("../models/activityTicketModel");
const activityReviewModel= require("../models/activityReviewModel");

const rateTourGuide = async (req, res) => {
    try {
        const userId = req.user._id;
        const tourGuideId= req.params.tourGuideId;
        const {rating} = req.body;

        // Verify that the user exists
        const tourist = await userModel.findById(userId);
        if (!tourist) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        // Retrieve itinerary tickets where the itinerary date has passed
        const itineraryTickets = await itineraryTicketModel
            .find({ tourist: userId, status: 'active' })
            .populate({
                path: 'itinerary',
                select: '_id name tourGuide availableDates',
                populate: {
                    path: 'tourGuide',
                    select: '_id username', // Get tour guide ID and username only
                },
            });

        // Filter tickets to include only those with past dates
        const completedItineraries = itineraryTickets.filter(ticket => {
            return ticket.itinerary && ticket.itinerary.availableDates.some(date => new Date(date) < new Date());
        });

        // Extract unique tour guides the tourist has toured with
        const uniqueTourGuides = Array.from(
            new Map(
                completedItineraries.map(ticket => [ticket.itinerary.tourGuide._id.toString(), {
                    tourGuideId: ticket.itinerary.tourGuide._id,
                    tourGuideName: ticket.itinerary.tourGuide.username
                }])
            ).values()
        );

        // Check if the provided tourGuideId is in the list of unique tour guides
        const isTourGuideCompleted = uniqueTourGuides.some(guide => guide.tourGuideId.toString() === tourGuideId);
        if (!isTourGuideCompleted) {
            return res.status(400).json({ message: 'You can only rate a tour guide you have completed a tour with' });
        }

        // Check if a rating already exists for this tourist and tour guide, if so, update it
        const existingReview = await tourGuideReviewModel.findOne({ tourist: userId, tourGuide: tourGuideId });
        if (existingReview) {
            existingReview.rating = rating;
            await existingReview.save();
            return res.status(200).json({ message: 'Tour guide rating updated successfully' });
        }

        // If no existing review, create a new one
        const newReview = await tourGuideReviewModel.create({
            tourist: userId,
            tourGuide: tourGuideId,
            rating
        });

        res.status(201).json({ message: 'Tour guide rated successfully', review: newReview });
    } catch (error) {
        console.error("Error rating tour guide:", error);
        res.status(500).json({ message: "An error occurred while rating the tour guide" });
    }
};
const rateItinerary = async (req, res) => {
    try {
        const userId = req.user._id;
        const itineraryId = req.params.itineraryId;
        const { rating } = req.body;

        // Verify that the user exists
        const tourist = await userModel.findById(userId);
        if (!tourist) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Retrieve completed itinerary tickets for the user
        const itineraryTickets = await itineraryTicketModel
            .find({ tourist: userId, itinerary: itineraryId, status: 'active' })
            .populate({
                path: 'itinerary',
                select: '_id name availableDates',
            });

        // Check if the itinerary date has passed
        const hasAttendedItinerary = itineraryTickets.some(ticket =>
            ticket.itinerary.availableDates.some(date => new Date(date) < new Date())
        );

        if (!hasAttendedItinerary) {
            return res.status(400).json({ message: 'You can only rate an itinerary you have completed' });
        }

        // Check if a rating already exists for this tourist and itinerary, if so, update it
        const existingReview = await itineraryReviewModel.findOne({ tourist: userId, itinerary: itineraryId });
        if (existingReview) {
            existingReview.rating = rating;
            await existingReview.save();
            return res.status(200).json({ message: 'Itinerary rating updated successfully' });
        }

        // If no existing review, create a new one
        const newReview = await itineraryReviewModel.create({
            tourist: userId,
            itinerary: itineraryId,
            rating
        });

        res.status(201).json({ message: 'Itinerary rated successfully', review: newReview });
    } catch (error) {
        console.error("Error rating itinerary:", error);
        res.status(500).json({ message: "An error occurred while rating the itinerary" });
    }
};
const rateActivity = async (req, res) => {
    try {
        const userId = req.user._id;
        const activityId = req.params.activityId;
        const { rating } = req.body;

        // Verify that the user exists
        const tourist = await userModel.findById(userId);
        if (!tourist) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Retrieve activity tickets for the user and check if the activity date has passed
        const activityTickets = await activityTicketModel
            .find({ tourist: userId, activity: activityId, status: 'active' })
            .populate({
                path: 'activity',
                select: 'date name',
            });

        // Check if the activity date has passed
        const hasAttendedActivity = activityTickets.some(ticket => new Date(ticket.activity.date) < new Date());

        if (!hasAttendedActivity) {
            return res.status(400).json({ message: 'You can only rate an activity you have completed' });
        }

        // Check if a rating already exists for this tourist and activity, if so, update it
        const existingReview = await activityReviewModel.findOne({ tourist: userId, activity: activityId });
        if (existingReview) {
            existingReview.rating = rating;
            await existingReview.save();
            return res.status(200).json({ message: 'Activity rating updated successfully' });
        }

        // If no existing review, create a new one
        const newReview = await activityReviewModel.create({
            tourist: userId,
            activity: activityId,
            rating
        });

        res.status(201).json({ message: 'Activity rated successfully', review: newReview });
    } catch (error) {
        console.error("Error rating activity:", error);
        res.status(500).json({ message: "An error occurred while rating the activity" });
    }
};
const commentOnTourGuide = async (req, res) => {
    try {
        const userId = req.user._id;
        const tourGuideId= req.params.tourGuideId;
        const {comment} = req.body;
        // Verify that the user exists
        const tourist = await userModel.findById(userId);
        if (!tourist) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Retrieve itinerary tickets where the itinerary date has passed
        const itineraryTickets = await itineraryTicketModel
            .find({ tourist: userId, status: 'active' })
            .populate({
                path: 'itinerary',
                select: '_id name tourGuide availableDates',
                populate: {
                    path: 'tourGuide',
                    select: '_id username',
                },
            });

        // Filter tickets to include only those with past dates
        const completedItineraries = itineraryTickets.filter(ticket => {
            return ticket.itinerary && ticket.itinerary.availableDates.some(date => new Date(date) < new Date());
        });

        // Extract unique tour guides the tourist has toured with
        const uniqueTourGuides = Array.from(
            new Map(
                completedItineraries.map(ticket => [ticket.itinerary.tourGuide._id.toString(), {
                    tourGuideId: ticket.itinerary.tourGuide._id,
                    tourGuideName: ticket.itinerary.tourGuide.username
                }])
            ).values()
        );

        // Check if the provided tourGuideId is in the list of unique tour guides
        const isTourGuideCompleted = uniqueTourGuides.some(guide => guide.tourGuideId.toString() === tourGuideId);
        if (!isTourGuideCompleted) {
            return res.status(400).json({ message: 'You can only comment on a tour guide you have completed a tour with' });
        }

        // Check if a review already exists for this tourist and tour guide
        const existingReview = await tourGuideReviewModel.findOne({ tourist: userId, tourGuide: tourGuideId });
        if (existingReview) {
            existingReview.comment = comment;
            await existingReview.save();
            return res.status(200).json({ message: 'Tour guide comment updated successfully', review: existingReview });
        }

        // If no existing review, create a new one with the comment
        const newReview = await TourGuideReview.create({
            tourist: userId,
            tourGuide: tourGuideId,
            comment
        });

        res.status(201).json({ message: 'Tour guide commented on successfully', review: newReview });
    } catch (error) {
        console.error("Error commenting on tour guide:", error);
        res.status(500).json({ message: "An error occurred while commenting on the tour guide" });
    }
};
const commentOnItinerary = async (req, res) => {
    try {
        const userId = req.user._id;
        const itineraryId = req.params.itineraryId;
        const { comment } = req.body;

        // Verify that the user exists
        const tourist = await userModel.findById(userId);
        if (!tourist) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Retrieve completed itinerary tickets for the user
        const itineraryTickets = await itineraryTicketModel
            .find({ tourist: userId, itinerary: itineraryId, status: 'active' })
            .populate({
                path: 'itinerary',
                select: '_id name availableDates',
            });

        // Check if the itinerary date has passed
        const hasAttendedItinerary = itineraryTickets.some(ticket =>
            ticket.itinerary.availableDates.some(date => new Date(date) < new Date())
        );

        if (!hasAttendedItinerary) {
            return res.status(400).json({ message: 'You can only comment on an itinerary you have completed' });
        }

        // Check if a comment already exists for this tourist and itinerary, if so, update it
        const existingReview = await itineraryReviewModel.findOne({ tourist: userId, itinerary: itineraryId });
        if (existingReview) {
            existingReview.comment = comment;
            await existingReview.save();
            return res.status(200).json({ message: 'Itinerary comment updated successfully', review: existingReview });
        }

        // If no existing review, create a new one with the comment
        const newReview = await itineraryReviewModel.create({
            tourist: userId,
            itinerary: itineraryId,
            comment
        });

        res.status(201).json({ message: 'Itinerary commented on successfully', review: newReview });
    } catch (error) {
        console.error("Error commenting on itinerary:", error);
        res.status(500).json({ message: "An error occurred while commenting on the itinerary" });
    }
};
const commentOnActivity = async (req, res) => {
    try {
        const userId = req.user._id;
        const activityId = req.params.activityId;
        const { comment } = req.body;

        // Verify that the user exists
        const tourist = await userModel.findById(userId);
        if (!tourist) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Retrieve activity tickets for the user and check if the activity date has passed
        const activityTickets = await activityTicketModel
            .find({ tourist: userId, activity: activityId, status: 'active' })
            .populate({
                path: 'activity',
                select: 'date name',
            });

        // Check if the activity date has passed
        const hasAttendedActivity = activityTickets.some(ticket => new Date(ticket.activity.date) < new Date());

        if (!hasAttendedActivity) {
            return res.status(400).json({ message: 'You can only comment on an activity you have completed' });
        }

        // Check if a comment already exists for this tourist and activity
        const existingReview = await activityReviewModel.findOne({ tourist: userId, activity: activityId });
        if (existingReview) {
            existingReview.comment = comment;
            await existingReview.save();
            return res.status(200).json({ message: 'Activity comment updated successfully', review: existingReview });
        }

        // If no existing review, create a new one with the comment
        const newReview = await activityReviewModel.create({
            tourist: userId,
            activity: activityId,
            comment
        });

        res.status(201).json({ message: 'Activity commented on successfully', review: newReview });
    } catch (error) {
        console.error("Error commenting on activity:", error);
        res.status(500).json({ message: "An error occurred while commenting on the activity" });
    }
};
const getUnratedTourGuidesForCompletedItineraries = async (req, res) => {
    try {
        // Step 1: Verify that the user exists
        const tourist = await userModel.findById(req.user._id);
        if (!tourist) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Step 2: Retrieve past itinerary tickets and populate tour guides
        const itineraryTickets = await itineraryTicketModel
            .find({ tourist: req.user._id, status: 'active' })
            .populate({
                path: 'itinerary',
                select: '_id name tourGuide availableDates',
                populate: {
                    path: 'tourGuide',
                    select: '_id username', // Only include tour guide ID and username
                },
            });

        // Filter tickets to include only those with past dates
        const completedItineraries = itineraryTickets.filter(ticket => {
            return ticket.itinerary && ticket.itinerary.availableDates.some(date => new Date(date) < new Date());
        });

        // Step 3: Get all rated tour guides by this tourist
        const ratedTourGuides = await tourGuideReviewModel.find({ tourist: req.user._id }).select('tourGuide');
        const ratedTourGuideIds = ratedTourGuides.map(review => review.tourGuide.toString());

        // Step 4: Filter out tour guides that have already been rated
        const unratedTourGuides = Array.from(
            new Map(
                completedItineraries
                    .filter(ticket => !ratedTourGuideIds.includes(ticket.itinerary.tourGuide._id.toString()))
                    .map(ticket => [ticket.itinerary.tourGuide._id.toString(), {
                        tourGuideId: ticket.itinerary.tourGuide._id,
                        tourGuideName: ticket.itinerary.tourGuide.username
                    }])
            ).values()
        );

        // Step 5: Check if there are unrated tour guides
        if (unratedTourGuides.length === 0) {
            return res.status(400).json({ message: 'No unrated tour guides for completed itineraries' });
        }

        res.status(200).json({
            message: 'Unrated tour guides for completed itineraries retrieved successfully',
            tourGuides: unratedTourGuides
        });
    } catch (error) {
        console.error("Error retrieving unrated tour guides:", error);
        res.status(500).json({ message: "Couldn't retrieve unrated tour guides" });
    }
};

module.exports= {rateTourGuide,commentOnTourGuide,rateItinerary,commentOnItinerary,rateActivity,commentOnActivity,getUnratedTourGuidesForCompletedItineraries}