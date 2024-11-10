// services/amadeusService.js
const amadeus = require('../config/amadeus'); // Import the configured Amadeus client

// Function to search for flights
const searchFlights = async (origin, destination, departureDate, returnDate = null, adults = 1, direct = false, departureTime = null, returnTime = null) => {
    try {
        const locationResponse1 = await amadeus.referenceData.locations.get({
            keyword: origin,
            subType: 'CITY'
        });
        const locationResponse2 = await amadeus.referenceData.locations.get({
            keyword: destination,
            subType: 'CITY'
        });
        const params = {
            originLocationCode: locationResponse1,
            destinationLocationCode: locationResponse2,
            departureDate,
            adults,
            ...(returnDate && { returnDate }),
            ...(departureTime && { departureTime }), // Include departureTime if provided
            ...(returnTime && { returnTime })       // Include returnTime if provided
        };

        const response = await amadeus.shopping.flightOffersSearch.get(params);

        // Map over the results to extract only top-level fields, duration, and times
        const formattedFlights = response.data
            .filter(flight => {
                // Filter based on direct or indirect trip
                if (direct) {
                    // For direct flights, every itinerary should have only one segment
                    return flight.itineraries.every(itinerary => itinerary.segments.length === 1);
                }
                return true; // Include all flights if `direct` is false
            })
            .map(flight => {
                const { price, numberOfBookableSeats, itineraries } = flight;

                // Calculate total duration from the itineraries
                const totalDuration = itineraries
                    .map(itinerary => itinerary.duration)
                    .join(" / "); // Join durations if there are multiple itineraries (e.g., for round-trip)

                // Extract actual departure and return times if available
                const actualDepartureTime = itineraries[0]?.segments[0]?.departure.at; // First segment of the first itinerary
                const actualReturnTime = itineraries[1]?.segments[0]?.departure.at; // First segment of the second itinerary (if round-trip)

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

const searchHotels = async (cityName) => {
    try {
        // Step 1: Get the city code from the city name using the Location Search API
        const locationResponse = await amadeus.referenceData.locations.get({
            keyword: cityName,
            subType: 'CITY'
        });
        console.log('------------------------------------------------------------------------------------------------------------------------' + locationResponse.data[0].iataCode + '----------------------------------------------------------')

        // Check if any locations were found
        if (!locationResponse.data || locationResponse.data.length === 0) {
            throw new Error(`City code for "${cityName}" not found`);
        }

        // Get the city code from the first matching result
        const cityCode = locationResponse.data[0].iataCode;

        // Step 2: Retrieve hotels by city code
        const response = await amadeus.referenceData.locations.hotels.byCity.get({
            cityCode: cityCode
        });

        // Format the response to include only essential hotel details
        const hotels = response.data.map(hotel => ({
            hotelId: hotel.hotelId,
            name: hotel.name,
            address: hotel.address.lines,
            city: cityName,
            latitude: hotel.geoCode.latitude,
            longitude: hotel.geoCode.longitude
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
