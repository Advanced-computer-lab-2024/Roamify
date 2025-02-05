const mongoose = require("mongoose");

const transportationSchema = new mongoose.Schema(
    {
        advertiser: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        time: {
            type: String, // Use a standardized format, e.g., "08:00 AM"
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        type: {
            type: String,
            enum: ["bus", "train", "taxi", "shuttle", "metro", "private car"],
            required: true
        },
        pointsRedeemed: {
            type: Boolean,
            default: false

        },
        pickupLocation: {

            type: String,
            required: true // e.g., "123 Main St, Downtown"

        },
        dropOffLocation: {

            type: String,
            required: true // e.g., "456 Oak Ave, Near Central Park"

        },
        touristsBooked: {
            type: [mongoose.Types.ObjectId],
            ref: 'user'
        },
        price: {
            type: Number
        }
    },
    { timestamps: true }
);

const transportation = mongoose.model("transportation", transportationSchema);
module.exports = transportation;
