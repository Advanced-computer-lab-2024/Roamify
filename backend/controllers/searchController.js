const place = require('../models/placeModel.js');
const itinerary = require('../models/ItineraryModel.js');
const activity =require('../models/activityModel.js');


const searchPlaceActivityItinerary = async (req, res) => {
  try {
      const { query, type } = req.query;


      if (!query || !type) {
          return res.status(400).json({ message: 'Query and type are required' });
      }

      const typeNormalized = type.trim().toLowerCase();

      const searchFilter = {
          $or: [
              { name: new RegExp(query, 'i') },
              { category: new RegExp(query, 'i') },
              { tagPlace: new RegExp(query, 'i') }
          ]
      };

      let results;
      switch (typeNormalized) {
          case 'place':
              results = await place.find(searchFilter);
              break;
          case 'activity':
              results = await activity.find(searchFilter);
              break;
          case 'itinerary':
              results = await itinerary.find(searchFilter);
              break;
          default:
              return res.status(400).json({ message: 'Invalid type' });
      }

      return res.status(200).json(results);
  } catch (error) {
      console.error('Error during search:', error);
      return res.status(500).json({ message: 'Error occurred', error });
  }
};


module.exports={searchPlaceActivityItinerary};