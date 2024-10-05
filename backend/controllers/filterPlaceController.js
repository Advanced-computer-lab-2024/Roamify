const Place = require('../models/placeModel.js');

const filterPlacesByTag = async (req, res) => {
    try {
        const { tag } = req.query; 

        const filter = {};
        
        if (tag) {
            const tagsArray = tag.split(',').map(t => t.trim()); 
            filter.tagPlace = { $in: tagsArray }; 
        }

        const places = await Place.find(filter);
        console.log(filter);
        console.log(places);

        return res.status(200).json(places);
    } catch (error) {
        return res.status(500).json({ message: 'Error occurred', error: error.message });
    }
};


module.exports = { filterPlacesByTag };
