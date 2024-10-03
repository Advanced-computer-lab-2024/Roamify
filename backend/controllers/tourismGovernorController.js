// const tourismGovernor = require('../models/tourismGovernorModel');
// const historicalPlace = require('../models/historicalPlaceModel');

// const createHistoricalPlace = async (req, res) => {
//   try {
//     const newHistoricalPlace = new historicalPlace({
//       ...req.body,
//       governor: tourismGovernor._id // Associate the activity with the logged-in advertiser
//     });
//     const savedHistoricalPlace = await newHistoricalPlace.save();
//     res.status(201).json(savedHistoricalPlace);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// const getHistoricalPlace = async (req, res) => {
//   try {
//     const oneHistoricalPlace = await historicalPlace.findOne({ _id: req.params.id, governor: tourismGovernor._id });
//     if (!oneHistoricalPlace) return res.status(404).json({ message: 'Historical Place not found or not authorized' });
//     res.json(oneHistoricalPlace);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const updateHistoricalPlace = async (req, res) => {
//   try {
//     const oneHistoricalPlace = await historicalPlace.findOneAndUpdate(
//       { _id: req.params.id, governor: tourismGovernor._id },
//       req.body,
//       { new: true, runValidators: true } // Return the updated document and validate the update
//     );

//     if (!oneHistoricalPlace) return res.status(404).json({ message: 'Historical Place not found or not authorized' });

//     res.json(oneHistoricalPlace);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// const deleteHistoricalPlace = async (req, res) => {
//   try {
//     const oldHistoricalPlace = await historicalPlace.findOneAndDelete({ _id: req.params.id, tourismGovernor: tourismGovernor._id }); // Find and delete activity by ID
//     if (!oldHistoricalPlace) return res.status(404).json({ message: 'Activity not found' });
//     res.json({ message: 'Activity deleted successfully' }); // Respond with success message
//   } catch (err) {
//     res.status(500).json({ message: err.message }); // Handle errors
//   }
// };

// const getMyHistoricalPlaces = async (req, res) => {
//   try {
//     const historicalPlaces = await historicalPlace.find({ governor: tourismGovernor._id });
//     res.json(historicalPlaces);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = {
//   createHistoricalPlace,
//   getHistoricalPlace,
//   updateHistoricalPlace,
//   deleteHistoricalPlace,
//   getMyHistoricalPlaces
// };