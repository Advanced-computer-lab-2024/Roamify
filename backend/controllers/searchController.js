const place = require('../models/placeModel.js');
const itinerary = require('../models/ItineraryModel.js');
const activity = require('../models/activityModel.js');
const Category = require('../models/categoryModel'); // Assuming you have a Category model
const Tag = require('../models/preferenceTagModel'); // Assuming you have a Tag model (PreferenceTag)

const searchPlaceActivityItinerary = async (req, res) => {
  try {
    const { query, type } = req.query;

    // Validate request query
    if (!query || !type) {
      return res.status(400).json({ message: 'Query and type are required' });
    }

    const typeNormalized = type.trim().toLowerCase();

    // Build a base search filter for name field
    let searchFilter = { $or: [{ name: new RegExp(query, 'i') }] };

    // Search for matching category or tag by name
    let category = null;
    let tag = null;

    // Search for category by name
    category = await Category.findOne({ name: new RegExp(query, 'i') });
    if (category) {
      searchFilter.$or.push({ category: category._id });
    }

    // Search for tag by name
    tag = await Tag.findOne({ name: new RegExp(query, 'i') });
    if (tag) {
      searchFilter.$or.push({ tag: tag._id });
    }

    let results;
    switch (typeNormalized) {
      case 'place':
        results = await place.find(searchFilter).populate('category tag');
        break;
      case 'activity':
        results = await activity.find(searchFilter).populate('category tag');
        break;
      case 'itinerary':
        results = await itinerary.find(searchFilter).populate('activities preferenceTags');
        break;
      default:
        return res.status(400).json({ message: 'Invalid type' });
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error('Error during search:', error);
    return res.status(500).json({ message: 'Error occurred', error: error.message });
  }
};

module.exports = { searchPlaceActivityItinerary };
