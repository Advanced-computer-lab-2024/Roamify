import React, { useState, useEffect } from 'react';
import EditButton from '../Buttons/EditButton'; // Import the EditButton component
import DeleteButton from '../Buttons/DeleteButton'; // Import the DeleteButton component
import EditItineraryModal from '../Modals/EditItineraryModal'; // Import the EditItineraryModal component
import './TourGuideItinerary.css'; // Import main CSS for styling
import axios from 'axios';

const ItineraryList = () => {
    const [itineraries, setItineraries] = useState([]);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const profileId = localStorage.getItem('profileId');

    // Fetch the list of itineraries when the component mounts
    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/tour-guide/get-my-itinearies/${profileId}`);
                console.log("API Response:", response.data); // Log response for debugging
                setItineraries(response.data);
            } catch (err) {
                console.error("Error fetching itineraries:", err.message);
            }
        };
        fetchItineraries();
    }, []);

    // Handle delete itinerary
    const handleDelete = async (itineraryId) => {
        try {
            await axios.delete(`http://localhost:3000/tour-guide/delete-itineary/${profileId}/${itineraryId}`);
            setItineraries((prev) => prev.filter((itinerary) => itinerary._id !== itineraryId));
            console.log('Itinerary deleted:', itineraryId);
        } catch (err) {
            console.error("Error deleting itinerary:", err.message);
        }
    };

    // Handle edit itinerary (open modal)
    const handleEdit = (itinerary) => {
        setSelectedItinerary(itinerary);
        setIsEditing(true);
    };

    // Handle update itinerary
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            if (selectedItinerary) {
                await axios.put(`http://localhost:3000/tour-guide/update-itineary/${profileId}/${selectedItinerary._id}`, selectedItinerary);
                console.log('Updated Itinerary:', selectedItinerary);
                setIsEditing(false);
                // Refresh the itineraries list
                const response = await axios.get(`http://localhost:3000/tour-guide/get-my-itineraries/${profileId}`);
                setItineraries(response.data);
            }
        } catch (error) {
            console.error('Error updating itinerary:', error.message);
        }
    };

    // Handle input changes for the selected itinerary in the modal
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle array fields
        if (name.startsWith('availableDates') || name.startsWith('locations') || name.startsWith('preferenceTags')) {
            setSelectedItinerary((prev) => ({
                ...prev,
                [name]: value.split(',').map((item) => item.trim()),
            }));
        } else {
            setSelectedItinerary((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
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
                            <li key={itinerary._id} className="flex justify-between items-center p-4 border-b border-gray-300">
                                <div>
                                    <h3 className="font-semibold text-lg">{itinerary.name}</h3>
                                    <p>Activities: {itinerary.activities.join(', ')}</p>
                                    <p>Locations: {itinerary.locations.join(', ')}</p>
                                    <p>Language: {itinerary.language}</p>
                                    <p>Price: {itinerary.price}</p>
                                    <p>Available Dates: {itinerary.availableDates.map(date => new Date(date).toLocaleDateString()).join(', ')}</p>
                                    <p>Pick-Up Location: {itinerary.pickUpLocation}</p>
                                    <p>Drop-Off Location: {itinerary.dropOffLocation}</p>
                                    <p>Booked: {itinerary.booked ? 'Yes' : 'No'}</p>
                                    <p>Accessibility: {itinerary.accessibility ? 'Yes' : 'No'}</p>
                                    {itinerary.rating && <p>Rating: {itinerary.rating}</p>}
                                    {itinerary.preferenceTags && (
                                        <p>Preference Tags: {itinerary.preferenceTags.join(', ')}</p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <EditButton onClick={() => handleEdit(itinerary)}>Edit</EditButton>
                                    <DeleteButton onClick={() => handleDelete(itinerary._id)}>Delete</DeleteButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Render the EditItineraryModal if editing */}
            {isEditing && selectedItinerary && (
                <EditItineraryModal
                    itinerary={selectedItinerary}
                    onChange={handleChange}
                    onUpdate={handleUpdate}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </div>
    );
};

export default ItineraryList;
