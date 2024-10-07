const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid time format! (Expected: HH:MM)`,
      },
    },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
        validate: {
          validator: function (v) {
            if (!Array.isArray(v) || v.length !== 2) return false;
            const [lng, lat] = v;
            return lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
          },
          message: (props) =>
            `${props.value} is not a valid GeoJSON coordinates array!`,
        },
      },
      name: {
        type: String,
        required: true,
      },
    },
    price: {
      type: mongoose.Schema.Types.Mixed,
      validate: {
        validator: function (v) {
          return (
            typeof v === "number" ||
            (Array.isArray(v) &&
              v.length === 2 &&
              v.every((num) => typeof num === "number"))
          );
        },
        message: (props) =>
          `${props.value} is not a valid price! It should be a single number or an array of two numbers (min, max).`,
      },
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tag: {
      type: [mongoose.Types.ObjectId],
      ref: "PreferenceTag",
      required: true,
    },
    discounts: {
      type: Number,
      min: 0,
      max: 100,
    },
    bookingAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    advertiser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "advertiser",
      required: true,
    },
  },
  { timestamps: true }
);

// Geospatial index
activitySchema.index({ location: "2dsphere" });

const activityModel = mongoose.model("Activity", activitySchema);
module.exports = activityModel;
