const { searchHotels } = require('../services/amadeusService');


// controllers/hotelController.js
exports.searchHotels = async (req, res) => {
    const { cityCode, checkInDate, checkOutDate, adults, rooms } = req.body;
    try {
        const hotels = await searchHotels(cityCode, checkInDate, checkOutDate, adults, rooms);
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message, error: error.message });
    }
};