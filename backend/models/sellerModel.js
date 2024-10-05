const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      unique: true,
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sellerType: {
      type: String,
      enum: ["VTP", "External"], 
      required: true,
    },
  },
  { timestamps: true }
);
const sellerModel = mongoose.model("seller", sellerSchema);
module.exports = sellerModel;
