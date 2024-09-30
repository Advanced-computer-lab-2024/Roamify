const tourGuide = require('../models/tourGuideModel');
const Itineary = require('../models/itinearyModel');

const getDetails = async (req, res) => {
  try {
    const details = await tourGuide.findById(tourGuide._id);
    res.json(details);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const updateDetails = async (req, res) => {
  try {
      const details = await tourGuide.findOneAndUpdate(
          { _id: tourGuide._id},
          req.body,
          { new: true, runValidators: true } // Return the updated document and validate the update
      );
      res.json(details);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};

const getMyItinearies = async (req, res) => {
  try {
    const itinearies = await Itineary.find({ tourGuide: tourGuide._id });
    res.json(itinearies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getItineary = async (req, res) => {
  try {
      const itineary = await Itineary.findOne({ _id: req.params.id, tourGuider: tourGuide._id });
      if (!itineary) return res.status(404).json({ message: 'Activity not found or not authorized' });
      res.json(itineary);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

const updateItineary = async (req, res) => {
  try {
      const itineary = await Itineary.findOneAndUpdate(
          { _id: req.params.id, tourGuide: tourGuide._id },
          req.body,
          { new: true, runValidators: true } // Return the updated document and validate the update
      );

      if (!itineary) return res.status(404).json({ message: 'Activity not found or not authorized' });

      res.json(itineary);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};

const createItineary = async (req, res) => {
  try {
      const itineary = new Itineary({
          ...req.body,
          tourGuide: tourGuide._id // Associate the activity with the logged-in advertiser
      });
      const savedItineary = await Itineary.save();
      res.status(201).json(savedItineary);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};

const deleteItineary = async (req, res) => {
  try {
    const itineary = await Itineary.findOneAndDelete({_id: req.params.id, tourGuide: tourGuide._id}); // Find and delete activity by ID
    if (!itineary) return res.status(404).json({ message: 'Activity not found' });
    res.json({ message: 'Activity deleted successfully' }); // Respond with success message
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
}

module.exports = {
  
  getDetails,
  updateDetails,
  getMyItinearies,
  getItineary,
  updateItineary,
  createItineary,
  deleteItineary
};
