const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  picture: {
    type: String,
  },
  sellerId: {
    type: String,
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
  status: {
    type: String,
    enum: ["active", "archived"],
  },
  rating: {
    type: Number,
  },
});

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;