const tourismGovernorModel = require('../models/tourismGovernorModel');
//const historicalPlaceModel = require('../models/historicalPlaceModel');

// const createHistoricalPlace = async (req, res) => {
//     try {
//         const userId = req.params.id;

//         if (userId) {
//             const result = await tourismGovernorModel.findById(userId);
//             if (!((result) && userId)) {
//                 return res.status(400).json({ error: 'tourism governor does not exist' });
//             }
//         } //check for existence of profile for this user

//         const { description, pictures, location, hours, price, tags } = req.body;
//         const newHistoricalPlace = new historicalPlaceModel({

//             description: description,
//             pictures: pictures,
//             location: location,
//             hours: hours,
//             price: price,
//             user: userId

//         });
//         await newItineary.save();
//         res.status(200).json({ message: 'success', acceptedItineary: newItineary });

//     }
//     catch (e) {
//         res.status(404).json({ message: 'failed', error: e });
//         console.log(e);
//     }
// };

// const getHistoricalPlace = async (req, res) => {
//     try {
//         const historicalPlace = await historicalPlaceModel.findOne({ _id: req.params.id });
//         if (!historicalPlace) return res.status(404).json({ message: 'Historical Place not found' });
//         res.status(200).json({ HistoricalPlace: historicalPlace });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
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
//     try {
//         const historicalPlace = await historicalPlaceModel.findOneAndDelete({ _id: req.params.id }); // Find and delete itineary by ID
//         //We neet to validate that this tourism goernor owns it
//         if (!historicalPlace) return res.status(404).json({ message: 'Historical Place not found' });
//         res.status(200).json({ message: 'Historical Place removed successfully' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// const getMyHistoricalPlaces = async (req, res) => {
//     try {
//         const historicalplaces = await historicalPlaceModel.find({ user: req.params.id });
//         res.status(200).json(historicalplaces);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

module.exports = {
    // createHistoricalPlace,
    // getHistoricalPlace,
    //   updateHistoricalPlace,
    // deleteHistoricalPlace,
    // getMyHistoricalPlaces
};