const mongoose = require("mongoose");

const preferenceTagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const PreferenceTag = mongoose.model("preference tag", preferenceTagSchema);
module.exports = PreferenceTag;
