const place = require("../models/placeModel");
const activity = require("../models/activityModel");
const itinerary = require("../models/ItineraryModel");

const viewUpcoming = async (req, res) => {
  try {
    const today = new Date();
    const upcomingActivites = await activity.find({ date: { $gte: today } });
    const upcomingItineraries = await Itinerary.find({
      available_dates: { $elemMatch: { $gte: today } },
    });
    const upcomingPlaces = await place.find({ date: { $gte: today } }); //ana msh moktn3
    const results = {
      upcomingActivites,
      upcomingItineraries,
      upcomingPlaces,
    };

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error Occured", error });
  }
};
module.exports = { viewUpcoming };
