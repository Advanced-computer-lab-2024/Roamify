const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema(
    {
        tourGuide: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        activities: {
            type: [mongoose.Types.ObjectId],
            ref: 'activity',
            required: true,
        },
        locations: {
            type: [String],
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        availableDates: {
            type: [Date],
            required: true,
        },
        preferenceTags: {
            type: [mongoose.Types.ObjectId],
            ref: 'preference tag',
        },
        pickUpLocation: {
            type: String,
            required: true,
        },
        dropOffLocation: {
            type: String,
            required: true,
        },
        booked: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'], // Only allow 'active' or 'inactive' values
            default: 'active', // Set default status to 'active'
          },
        accessibility: {
            type: Boolean,
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Itinerary = mongoose.model('itinerary', itinerarySchema);
module.exports = Itinerary;
