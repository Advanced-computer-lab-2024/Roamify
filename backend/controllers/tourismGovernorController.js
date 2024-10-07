const placeModel = require('../models/placeModel');
const historicalTagModel = require('../models/historicalTagModel');

const createPlace = async (req, res) => {
    try {
      const tourismGovernorId = req.params.id;
  
      const {type,name,description,pictures,location,tagPlace,ticketPrice} = req.body;
  
      const tags = await tagModel.find({ Type : { $in: tagPlace } }).select('_id');
      const tagIds = tags.map(tag => tag._id);

      const newHistoricalPlace = new placeModel({
        type:type,
        name:name,
        description:description,
        tags:tagIds,
        pictures:pictures,
        location:location,
        ticketPrice:ticketPrice,
        tourismGovernorId:tourismGovernorId
      });
      await newHistoricalPlace.save();
      const historicalPlace = await placeModel.findById(newHistoricalPlace).populate('tourismGovernorId').populate('tags');
      res.status(200).json({ message: 'success', acceptedPlace: historicalPlace });
  
    }
    catch (e) {
      res.status(404).json({ message: 'failed', error: e });
      console.log(e);
    }
  };
  
  const getPlaces = async (req, res) => {
    try {
      const historicalPlaces = await placeModel.find().populate('tourismGovernorId').populate('tags');
      if(!historicalPlaces) res.status(401).json({message:'there are no places'});
      else res.status(200).json(historicalPlaces);   
    } catch (e) {
      return res.status(500).json({ message: "failed", error: e });
    }
  };
  
  const updatePlace = async (req, res) => {
    try {
      const historicalPlaceId = req.params.historicalPlaceId;  // Fixed typo
      const tourismGovernorId = req.params.tourismGovernorId;
  
      // Find the historical place and populate tourismGovernorId
      const historicalPlace = await placeModel.findById(historicalPlaceId).populate('tourismGovernorId');
      
      // Check if the place exists
      if (!historicalPlace) {
        return res.status(404).json({ message: 'Historical place not found' });
      }
  
      // Correctly check if the current user is authorized to edit the place
      if (historicalPlace.tourismGovernorId._id.toString() !== tourismGovernorId) {
        return res.status(403).json({ message: 'You are not allowed to edit others\' places' });
      }
  
      // Extract fields from request body
      const { type, name, description, tagPlace, pictures, location, ticketPrice } = req.body;
      const query = {};
      
      const tags = await historicalTagModel.find({ Type: { $in: tagPlace } }).select('_id');
      const tagIds = tags.map(tag => tag._id);

      // Build the update query
      if (type) query.type = type;
      if (name) query.name = name;
      if (description) query.description = description;
      if (tags) query.tags = tagIds;
      if (pictures) query.pictures = pictures;
      if (location) query.location = location;
      if (ticketPrice) query.ticketPrice = ticketPrice;
  
      // Update the historical place
      const updatedHistoricalPlace = await placeModel.findByIdAndUpdate(historicalPlaceId, query, { new: true })
        .populate('tourismGovernorId')
        .populate('tags');
  
      // Send response
      res.status(200).json({ message: 'Place updated successfully', place: updatedHistoricalPlace });
  
    } catch (e) {
      console.error(e);  // Log the error for debugging
      res.status(500).json({ error: e.message, message: 'Could not update place' });  // Use 500 for server errors
    }
  };
  
  const deletePlace = async (req, res) => {
    try {
      const tourismGovernorId = req.params.tourismGovernorId;
      const historicalPlaceId = req.params.historicalPlaceId;  // Fixed typo
  
      // Find the place and populate tourismGovernorId
      const historicalPlace = await placeModel.findById(historicalPlaceId).populate('tourismGovernorId');
  
      // Check if the place exists
      if (!historicalPlace) {
        return res.status(404).json({ message: 'Historical place not found' });
      }
  
      // Check if tourismGovernorId exists in the populated result
      if (!historicalPlace.tourismGovernorId) {
        return res.status(400).json({ message: 'tourismGovernorId not found in the place' });
      }
  
      // Check if the current user is authorized to delete the place
      if (historicalPlace.tourismGovernorId._id.toString() === tourismGovernorId) {
        await placeModel.findByIdAndDelete(historicalPlaceId);  // Correct variable name
        return res.status(200).json({ message: 'Place deleted successfully' });
      } else {
        return res.status(403).json({ message: 'You are not authorized to delete this place' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Could not delete place', error: err.message });
    }
  };  
  
  const getMyPlaces = async (req, res) => {
    try {
      const tourismGovernorId = req.params.id;
      const historicalPlaces = await placeModel.find({tourismGovernorId}).populate('tourismGovernorId').populate('tags');;
      res.status(200).json(historicalPlaces);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

module.exports = {
    createPlace,
    getPlaces,
    updatePlace,
    deletePlace,
    getMyPlaces
};