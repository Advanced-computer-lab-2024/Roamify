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
        
    },
    pictures: {
        type: [String]
    },
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
