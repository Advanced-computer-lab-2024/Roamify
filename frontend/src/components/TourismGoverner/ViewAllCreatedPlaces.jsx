import React, { useState, useEffect } from 'react';
import './TourismGovernerPage.css'; // Import main CSS for styling
import axios from 'axios';

const ViewAllCreatedPlaces = () => {
    const [places, setPlaces] = useState([]);
    const [error, setError] = useState(null);

    // Fetch the list of all places when the component mounts
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const response = await axios.get("http://localhost:3000/tourism-governor/get-places");
                console.log("API Response:", response.data); // Log response for debugging

                // Set the places if the response data is an array
                if (Array.isArray(response.data)) {
                    setPlaces(response.data);
                } else {
                    console.warn("Unexpected response structure:", response.data);
                }
            } catch (err) {
                console.error("Error fetching places:", err.message);
                setError("Failed to fetch places. Please try again later.");
            }
        };

        fetchPlaces();
    }, []); // Correct placement of dependency array

    return (
        <div className="places-list-page flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-5">All Created Places</h1>
            <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                {error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : places.length === 0 ? (
                    <p className="text-center">No places available.</p>
                ) : (
                    <ul className="places-list">
                        {places.map((place) => (
                            <li key={place._id} className="flex justify-between items-center p-4 border-b border-gray-300">
                                <div>
                                    <h3 className="font-semibold text-lg">{place.name}</h3>
                                    <p>Description: {place.description || "No description available"}</p>
                                    <p>Type: {place.type || "Type not specified"}</p>
                                    <p>Location: {place.location?.name || "Location not specified"}</p>
                                    <p>
                                        Coordinates: {place.location?.coordinates ? `${place.location.coordinates[0]}, ${place.location.coordinates[1]}` : "Coordinates not available"}
                                    </p>
                                    <p>Opening Hours: {place.openingHours || "Opening hours not specified"}</p>
                                    <p>Ticket Prices:</p>
                                    <ul className="ticket-prices-list">
                                        <li>Foreigner: {place.ticketPrice?.foreigner ?? "N/A"}</li>
                                        <li>Native: {place.ticketPrice?.Native ?? "N/A"}</li>
                                        <li>Student: {place.ticketPrice?.student ?? "N/A"}</li>
                                    </ul>
                                    <p>Tags: {Array.isArray(place.tags) ? place.tags.join(', ') : "Tags not specified"}</p>
                                    {place.pictures && place.pictures.length > 0 && (
                                        <div className="pictures-list">
                                            <p>Pictures:</p>
                                            <div className="flex gap-2">
                                                {place.pictures.map((picture, index) => (
                                                    <img
                                                        key={index}
                                                        src={picture}
                                                        alt={`Place picture ${index + 1}`}
                                                        className="w-32 h-32 object-cover"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ViewAllCreatedPlaces;
