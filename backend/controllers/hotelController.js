const { searchHotels } = require("../services/amadeusService");

// Controller to handle hotel search
exports.searchHotels = async (req, res) => {
    const { cityCode, checkInDate, checkOutDate } = req.body;

    try {
        // Validate input
        if (!cityCode || !checkInDate || !checkOutDate) {
            return res.status(400).json({
                message: "City code, check-in date, and check-out date are required to search for hotels.",
            });
        }

        // Call the hotel search service
        const hotels = await searchHotels(cityCode, checkInDate, checkOutDate);

        // Check if any hotels were found
        if (!hotels || hotels.length === 0) {
            return res.status(404).json({
                message: "No hotels found matching your search criteria. Please try different options.",
            });
        }

        // Respond with hotel details
        res.status(200).json({
            message: "Hotels retrieved successfully.",
            hotels,
        });
    } catch (error) {
        console.error("Error searching for hotels:", error);
        res.status(500).json({
            message: "An error occurred while searching for hotels. Please try again later.",
            error: error.message,
        });
    }
};
