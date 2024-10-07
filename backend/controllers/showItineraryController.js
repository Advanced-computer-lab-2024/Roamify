const Itinerary = require('../models/ItineraryModel.js');

const showallItineraies = async(req,res) =>{

    try {
        const Itineraries = await Itinerary.find({}); 
        return res.status(200).json(Itineraries);
    } catch (error) {
        return res.status(500).json({ message: 'Error occurred', error: error.message });
    }

};
module.exports = { showallItineraies };