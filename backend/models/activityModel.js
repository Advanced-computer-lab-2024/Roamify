const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // Validate time in "HH:MM" format using regex
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
            },
            message: props => `${props.value} is not a valid time format! (Expected: HH:MM)`
        },
        required: true
    },
    location: {
        //google maps api
    },
    price: {
        type: [Number],
        validate: {
            validator: function (v) {
                return Array.isArray(v) ? v.length === 2 : true;
            },
            message: props => `${props.value} is not a valid price! It should be a single number or an array of two numbers (min, max).`
        },
        required: true
    },
    category : {
        type : String,
        enum : ['Concert','Sports','Tour','Theater', 'Workshop'] , //add more if you see fit
        required: true
    },
    tags : {
        type: [String],
        required: false
    },
    discounts : {
        type: {
            percentage: { type: Number, min: 0, max: 100 },
            amount: { type: Number, min: 0 }
        },
        required: false
    },
    bookingAvailable : {
        type: Boolean,
        required: true,
        default: true
    },
    advertiser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Advertiser',
        required: true
    }
});
const activityModel = mongoose.Model('activity', activitySchema);
module.exports = activityModel;