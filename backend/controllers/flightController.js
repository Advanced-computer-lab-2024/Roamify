// controllers/flightController.js
const { searchFlights } = require('../services/amadeusService');

// Controller to handle flight search
exports.searchFlights = async (req, res) => {
    const { origin, destination, departureDate, returnDate } = req.body; // Add returnDate to request body
    try {
        if (!origin || !destination || !departureDate) throw Error("Please provide the origin, destination, and departure date to search for flights.")
        const flights = await searchFlights(origin, destination, departureDate, returnDate);
        if (flights.length === 0) res.status(400).json({ message: 'no flights for your specified criteria' })
        else res.status(200).json(flights);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};
