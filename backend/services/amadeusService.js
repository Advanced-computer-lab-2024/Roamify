// services/amadeusService.js
const amadeus = require('../config/amadeus'); // Import the configured Amadeus client

// Function to search for flights
const searchFlights = async (origin, destination, departureDate) => {
    try {
        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate,
            adults: 1, // Assuming 1 adult for simplicity, can be dynamic
        });
        return response.data; // Return the list of flights
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

// Function to book a flight
const bookFlight = async (flightOffer) => {
    try {
        const response = await amadeus.booking.flightOrders.post(JSON.stringify({ data: flightOffer }));
        return response.data; // Return the booking confirmation details
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }
};

module.exports = { searchFlights, bookFlight };
