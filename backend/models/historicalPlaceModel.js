const mongoose = require('mongoose');

const historicalPlaceSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    pictures: {
        type: [String], //store urls
        required: true
    },
    location: {
        //google maps api
    },
    hours: {
        type: [String],
        required: true,
        validate: {
            validator: function (v) {
                // Validate time in "HH:MM" format using regex
                return (/^([01]\d|2[0-3]):([0-5]\d)$/.test(v)) && (Array.isArray(v) && v.length ===2);
            },
            message: props => `${props.value} is not a valid time format! (Expected: HH:MM)`
        },
        required: true
    },
    price: {
        type: [Number],
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.length ===3;
            },
            message: props => `${props.value} is not a valid price! It should be 3 prices for Foreigner, Native or Student.`
        },
        required: true
    },
    tags : {
        type: [String],
        required: false
    },
    governor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tourismGovernor',
        required: true
    }
});
const historicalPlaceModel = mongoose.Model('historicalPlace', historicalPlaceSchema);
module.exports = historicalPlaceModel;