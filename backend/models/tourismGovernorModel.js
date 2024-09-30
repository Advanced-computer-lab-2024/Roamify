const mongoose = require('mongoose');

// Define Tourism Governor Schema (no role)
const tourismGovernorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('TourismGovernor', tourismGovernorSchema);
