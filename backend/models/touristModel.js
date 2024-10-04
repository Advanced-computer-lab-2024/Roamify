const mongoose = require('mongoose')




const touristSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        unique: true
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    nationality: {
        type: Number,
        required: true
    },
    dateofBirth: {
        type: Date, //changed to Date instead of String
        required: true
    },
    occupation: {
        type: String,
        enum: ['Student', 'Employee'],
        required: true
    },
    wallet: {
        type: mongoose.Types.ObjectId,
        ref: 'wallet'
    }

}, { timestamps: true })


const touristModel = mongoose.model('Tourist', touristSchema);
module.exports =
    touristModel;
