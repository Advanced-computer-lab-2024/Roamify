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
      type: Date, //changed to Date instead of String
      required: true,
    },
    occupation: {
      type: String,
      enum: ["student", "employee","Student","Employee"],
      required: true,
    },

    adult:{
      type:Boolean,
      required:true
    },
    wallet: {
      type: mongoose.Types.ObjectId,
      ref: "wallet",
    }

  },
  { timestamps: true }
);
const touristModel = mongoose.model("tourist", touristSchema);
module.exports = touristModel;
