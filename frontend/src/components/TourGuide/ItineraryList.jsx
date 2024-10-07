import React, { useState, useEffect } from 'react';
import EditButton from '../Buttons/EditButton'; // Import the EditButton component
import DeleteButton from '../Buttons/DeleteButton'; // Import the DeleteButton component
import './TourGuideItinerary.css'; // Import main CSS for styling

const ItineraryList = () => {
    const [itineraries, setItineraries] = useState([]);

    // Fetch the list of itineraries when the component mounts
    useEffect(() => {
        const fetchItineraries = async () => {
            // Simulate fetching data from an API
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
            ];
            setItineraries(fetchedItineraries);
        };

        fetchItineraries();
    }, []);

    // Handle delete itinerary
    const handleDelete = (itineraryId) => {
        // Here you can add the code to delete the itinerary from the backend
        const updatedItineraries = itineraries.filter((itinerary) => itinerary.id !== itineraryId);
        setItineraries(updatedItineraries);
        console.log('Itinerary deleted:', itineraryId);
    };

    return (
        <div className="itinerary-list-page flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-5">My Created Itineraries</h1>
            <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                {itineraries.length === 0 ? (
                    <p className="text-center">No itineraries created yet.</p>
                ) : (
                    <ul className="itinerary-list">
                        {itineraries.map((itinerary) => (
                            <li key={itinerary.id} className="flex justify-between items-center p-4 border-b border-gray-300">
                                <div>
                                    <h3 className="font-semibold text-lg">{itinerary.name}</h3>
                                    <p>Activities: {itinerary.activities}</p>
                                    <p>Locations: {itinerary.locations}</p>
                                    <p>Date Range: {itinerary.dateRange}</p>
                                    <p>Language: {itinerary.language}</p>
                                </div>
                                <div className="flex gap-2">
                                    <EditButton>Edit</EditButton>
                                    <DeleteButton onClick={() => handleDelete(itinerary.id)}>Delete</DeleteButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ItineraryList;
