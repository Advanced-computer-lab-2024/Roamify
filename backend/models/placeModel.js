const mongoose = require('mongoose');
const historicalTag = require('./historicalTagModel');

const placeSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['museum', 'historical_site'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: [mongoose.Types.ObjectId],
        ref: 'historical tag',
    },
    pictures: [
        {
            url: {
                type: String,
                required: true // The Cloudinary URL for displaying the image
            },
            publicId: {
                type: String,
                required: true // The Cloudinary public ID for deletion
            }
        }
    ],
    location: {
        type: {
            type: String,
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator: function (v) {
                    if (!Array.isArray(v) || v.length !== 2) return false;
                    const [lng, lat] = v;
                    return lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
                },
                message: props => `${props.value} is not a valid GeoJSON coordinates array!`
            }
        },
        name: {
            type: String,
            required: true
        }
    },
    ticketPrice: {
        Native: {
            type: Number
        },
        Foreigner: {
            type: Number
        },
        Student: {
            type: Number
        }
    },
    openingHours: {
        type: String
    },
    closingHours: {
        type: String
    },
    tourismGovernorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });

const Place = mongoose.model('place', placeSchema);

module.exports = Place;
