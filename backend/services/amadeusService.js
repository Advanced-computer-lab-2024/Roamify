// services/amadeusService.js
const amadeus = require('../config/amadeus'); // Import the configured Amadeus client

// Function to search for flights
const searchFlights = async (origin, destination, departureDate, returnDate = null, adults = 1, direct = false, departureTime = null, returnTime = null) => {
    try {
        const params = {
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate,
            adults,
            ...(returnDate && { returnDate }),
            ...(departureTime && { departureTime }), // Include departureTime if provided
            ...(returnTime && { returnTime })       // Include returnTime if provided
        };

        const response = await amadeus.shopping.flightOffersSearch.get(params);

        const formattedFlights = response.data
            .filter(flight => {
                if (direct) {
                    return flight.itineraries.every(itinerary => itinerary.segments.length === 1);
                }
                return true;
            })
            .map(flight => {
                const { price, numberOfBookableSeats, itineraries } = flight;

                const totalDuration = itineraries
                    .map(itinerary => itinerary.duration)
                    .join(" / ");

                const actualDepartureTime = itineraries[0]?.segments[0]?.departure.at;
                const actualReturnTime = itineraries[1]?.segments[0]?.departure.at;

                return {
                    price: price.total,
                    currency: price.currency,
                    availableSeats: numberOfBookableSeats,
                    duration: totalDuration,
                    departureTime: actualDepartureTime || null,
                    returnTime: actualReturnTime || null,
                    isDirect: direct
                };
            });

        console.log("Formatted flights with duration, direct filter, and times:", formattedFlights);
        return formattedFlights;
    } catch (error) {
        console.error("Error in searchFlights:", error);
        throw new Error("An unknown error occurred in flight search");
    }
};

const searchHotels = async (cityCode) => {
    try {

        //retrieves hotels in city
        const response = await amadeus.referenceData.locations.hotels.byCity.get({
            cityCode: cityCode
        });

        // Format the response to include only essential hotel details
        const hotels = response.data.map(hotel => ({
            hotelId: hotel.hotelId,
            name: hotel.name,
        }));

        console.log("Hotels:", hotels);
        return hotels;
    } catch (error) {
        console.error("Error in searchHotels:", error);
        throw new Error("Failed to fetch hotels in the specified city");
    }
};









// // Function to book a flight
// const bookFlight = async (flightOffer) => {
//     try {
//         const response = await amadeus.booking.flightOrders.post(JSON.stringify({ data: flightOffer }));
//         return response.data; // Return the booking confirmation details
//     } catch (error) {
//         throw new Error(error.response ? error.response.data : error.message);
//     }
// };

module.exports = { searchFlights, searchHotels };
