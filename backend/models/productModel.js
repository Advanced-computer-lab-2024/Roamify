const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    picture: {
      type: String,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        review: String,
        rating: Number,
      },
    ],
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
