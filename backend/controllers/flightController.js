// controllers/flightController.js
const { searchFlights } = require('../services/amadeusService');

// Controller to handle flight search
exports.searchFlights = async (req, res) => {
    const { origin, destination, departureDate, returnDate } = req.body; // Add returnDate to request body
    try {
        // Call searchFlights with returnDate if provided (for round-trip), or without it (for one-way)
        const flights = await searchFlights(origin, destination, departureDate, returnDate);
        res.status(200).json(flights);
        if (flights.length === 0) res.status(400).json({ message: 'no flights for your specified criteria' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error searching flights', error: error.message });
    }
};


// Controller to handle flight booking
// exports.bookFlight = async (req, res) => {
//     const { flightOffer } = req.body;
//     try {
//         const booking = await bookFlight(flightOffer);
//         res.status(200).json(booking);
//     } catch (error) {
//         res.status(500).json({ message: 'Error booking flight', error: error.message });
//     }
// };
