const { searchFlights } = require("../services/amadeusService");

// Controller to handle flight search
exports.searchFlights = async (req, res) => {
  const { origin, destination, departureDate, returnDate } = req.body;

  try {
    // Validate required fields
    if (!origin || !destination || !departureDate) {
      return res.status(400).json({
        message: "Origin, destination, and departure date are required to search for flights.",
      });
    }

    // Call the flight search service
    const flights = await searchFlights(origin, destination, departureDate, returnDate);

    // Check if any flights were found
    if (!flights || flights.length === 0) {
      return res.status(404).json({
        message: "No flights found for your specified criteria. Please try different options.",
      });
    }

    // Respond with flight details
    res.status(200).json({
      message: "Flights retrieved successfully.",
      flights,
    });
  } catch (error) {
    console.error("Error searching for flights:", error);
    res.status(500).json({
      message: "An error occurred while searching for flights. Please try again later.",
      error: error.message,
    });
  }
};
