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
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    tags: {
      type: [mongoose.Types.ObjectId],
      ref: "preference tag",
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
      max: 5,
      default: 0,
    },
    advertiser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    flag: {
      type: Boolean,
      default: false
    },
    adminStatus: {
      type: String,
      enum: ['accepted', 'pending', 'rejected'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

activitySchema.index({ location: "2dsphere" });
activitySchema.pre('remove', async function (next) {
  try {
    await mongoose.model('activity review').deleteMany({ activity: this._id });
    next();
  } catch (error) {
    next(error);
  }
});
const activityModel = mongoose.model("activity", activitySchema);
module.exports = activityModel;
