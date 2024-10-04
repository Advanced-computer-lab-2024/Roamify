const mongoose = require('mongoose');

const tourGuideSchema = new mongoose.Schema({
 
  user: {
    type: mongoose.Schema.Types.ObjectId,
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
    type: Number,
    required: true
  },
  yearsOfExperience: {
    type: Number,
    required: true
  },
  previousWork: {
    type: String,
    required: true
  }

}, { timestamps: true });
const tourGuideModel = mongoose.model('tourguide', tourGuideSchema);
module.exports = tourGuideModel;
