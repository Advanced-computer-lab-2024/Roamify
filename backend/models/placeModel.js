const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['museum', 'historical_site']
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tagPlace: {
        type: String // Ensure this field is present
    },
    pictures: {
        type: [String]
    },
    location: {
        latitude: {  
            type: Number,  // Ensure latitude is a number type
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    ticketPrice: {
        Native: {
            type: Number
        },
        foreigner: {
            type: Number
        },
        student: {
            type: Number
        }
    },
    governorId: {
        tag: {
            type: [String]
        }
    }
}, { timestamps: true });

const Place = mongoose.models.Place || mongoose.model('Place', placeSchema);

module.exports = Place;
