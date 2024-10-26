const mongoose = require("mongoose");

const tourGuideSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      unique: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
    },
    previousWork: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const tourGuideModel = mongoose.model("tour guide", tourGuideSchema);
module.exports = tourGuideModel;
