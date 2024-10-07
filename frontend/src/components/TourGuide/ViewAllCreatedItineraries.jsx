import React, { useState, useEffect } from 'react';
import './TourGuideItinerary.css'; // Import main CSS for styling

const ViewAllCreatedItineraries = () => {
    const [itineraries, setItineraries] = useState([]);

    // Fetch the list of itineraries when the component mounts
    useEffect(() => {
        const fetchItineraries = async () => {
            // Simulate fetching data from an API (you can replace this with your API call)
            const fetchedItineraries = [
                {
                    id: 1,
                    name: 'City Tour Itinerary',
                    activities: 'City Walking Tour, Museum Visit',
                    locations: 'Downtown, City Museum',
                    dateRange: '2024-11-15 to 2024-11-17',
                    language: 'English',
                },
                {
                    id: 2,
                    name: 'Mountain Adventure Itinerary',
                    activities: 'Hiking, Camping',
                    locations: 'Highland Park, Mountain Base',
                    dateRange: '2024-12-01 to 2024-12-03',
                    language: 'Spanish',
                },
                // Additional itineraries can be added here
            ];
            setItineraries(fetchedItineraries);
        };

        fetchItineraries();
    }, []);

    return (
        <div className="itinerary-list-page flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-5">All Created Itineraries</h1>
            <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                {itineraries.length === 0 ? (
                    <p className="text-center">No itineraries created yet.</p>
                ) : (
                    <ul className="itinerary-list">
                        {itineraries.map((itinerary) => (
                            <li key={itinerary.id} className="flex flex-col p-4 border-b border-gray-300">
                                <div>
                                    <h3 className="font-semibold text-lg">{itinerary.name}</h3>
                                    <p><strong>Activities:</strong> {itinerary.activities}</p>
                                    <p><strong>Locations:</strong> {itinerary.locations}</p>
                                    <p><strong>Date Range:</strong> {itinerary.dateRange}</p>
                                    <p><strong>Language:</strong> {itinerary.language}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ViewAllCreatedItineraries;
