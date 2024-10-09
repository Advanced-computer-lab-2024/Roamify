const mongoose = require("mongoose");

const historicalTagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const historicalTagModel = mongoose.model("historicalTag", historicalTagSchema);
module.exports = historicalTagModel;
