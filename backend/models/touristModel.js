const mongoose = require("mongoose");

const touristSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    occupation: {
      type: String,
      enum: ["student", "employee"],
      required: true,
    },

    adult: {
      type: Boolean,
      required: true
    },
    wallet: {
      type: mongoose.Types.ObjectId,
      ref: "wallet",
    },
    preferences: {
      type: [mongoose.Types.ObjectId],
      ref: 'preference tag'
    },
    level: {
      type: Number,
      default: 1
    },
    points: {
      type: Number,
      default: 0
    }

  },
  { timestamps: true }
);
const touristModel = mongoose.model("tourist", touristSchema);
module.exports = touristModel;
