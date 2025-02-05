const mongoose = require("mongoose");

const advertiserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      unique: true,
    },
    logo: {
      url: {
          type: String,
      },
      publicId: {
          type: String,
      }
  },
    companyName: {
      type: String,
      required: true,
    },
    websiteLink: {
      type: String,
      required: true,
    },
    hotline: {
      type: Number,
      required: true,
    },
    companyProfile: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const advertiserModel = mongoose.model("advertiser", advertiserSchema);
module.exports = advertiserModel;
