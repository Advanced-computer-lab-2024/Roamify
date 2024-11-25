const { searchHotels } = require('../services/amadeusService');


// controllers/hotelController.js
exports.searchHotels = async (req, res) => {
    const { cityCode, checkInDate, checkOutDate } = req.body;
    try {
        const hotels = await searchHotels(cityCode, checkInDate, checkOutDate);
        if (hotels.length === 0) throw Error('no hotles meeet your searching criteria')
        res.status(200).json(hotels);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message, error: error.message });
    }
};