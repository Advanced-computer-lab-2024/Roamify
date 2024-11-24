
const amadeus = require('../config/amadeus'); // Import the configured Amadeus client

const searchFlights = async (origin, destination, departureDate, returnDate, adults = 1) => {
    try {
        const params = {
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate,
            adults,
            ...(returnDate && { returnDate }),
            max: 10
        };


        //fetch flights with the specified params
        const response = await amadeus.shopping.flightOffersSearch.get(params);
        //return only desired keys
        const flights = response.data.map(flight => {
            const { price, numberOfBookableSeats, itineraries } = flight;
            return {
                price: price.total,
                currency: price.currency,
                availableSeats: numberOfBookableSeats,
                departure: itineraries[0].segments[0].departure.at,
                arrival: itineraries[0].segments[itineraries[0].segments.length - 1].arrival.at
            };
        });

        return flights;
    } catch (error) {
        console.error("Error in searchFlights:", error.message);
        throw new Error("Unable to fetch flight data");
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


module.exports = { searchFlights, searchHotels };
