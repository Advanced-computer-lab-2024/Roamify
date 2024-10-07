const Place = require('../models/placeModel.js');

const showallPlaces = async(req,res) =>{

    try {
        const places = await Place.find({}); 
        return res.status(200).json(places);
    } catch (error) {
        return res.status(500).json({ message: 'Error occurred', error: error.message });
    }

};

module.exports = { showallPlaces };