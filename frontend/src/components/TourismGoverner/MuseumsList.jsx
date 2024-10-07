import React, { useState, useEffect } from 'react';
import EditButton from '../Buttons/EditButton'; // Import the EditButton component
import DeleteButton from '../Buttons/DeleteButton'; // Import the DeleteButton component
import EditPlaceModal from '../Modals/EditPlaceModal'; // Import the EditPlaceModal component (will reuse for museums)
import './TourismGovernerPage.css'; // Import main CSS for styling
import axios from 'axios';
const profileId = localStorage.getItem('profileId');

const MuseumsList = () => {
    const [museums, setMuseums] = useState([]);
    const [selectedMuseum, setSelectedMuseum] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch the list of museums when the component mounts
    useEffect(() => {
        const fetchMuseums = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/tourism-governor/get-my-places/${profileId}`);
                console.log("API Response:", response.data); // Log response for debugging
                setMuseums(response.data);
            } catch (err) {
                console.error("Error fetching museums:", err.message);
            }
        };

        fetchMuseums();
    }, []);

    // Handle delete museum
    const handleDelete = async (museumId) => {
        try {
            await axios.delete(`http://localhost:3000/tourism-governor/delete-place/${profileId}/${museumId}`);
            setMuseums((prev) => prev.filter((museum) => museum._id !== museumId));
            console.log('Museum deleted:', museumId);
        } catch (err) {
            console.error("Error deleting museum:", err.message);
        }
    };

    // Handle edit museum (open modal)
    const handleEdit = (museum) => {
        setSelectedMuseum(museum);
        setIsEditing(true);
    };

    // Handle update museum
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            if (selectedMuseum) {
                await axios.put(`http://localhost:3000/tourism-governor/update-place/${profileId}/${selectedMuseum._id}`, selectedMuseum);
                console.log('Updated Place:', selectedMuseum);
                setIsEditing(false);
                // Refresh the museums list
                const response = await axios.get(`http://localhost:3000/tourism-governor/get-my-places/${profileId}`);
                setMuseums(response.data);
            }
        } catch (error) {
            console.error('Error updating place:', error.message);
        }
    };

    // Handle input changes for the selected museum in the modal
    // Handle input changes for the selected museum in the modal
    const handleChange = (e) => {
        if (!e || !e.target) {
            console.error("Event or target is undefined");
            return; // Exit the function if the event or target is not defined
        }

        const { name, value } = e.target;

        if (name.startsWith('location.')) {
            const field = name.split('.')[1];
            setSelectedMuseum((prev) => ({
                ...prev,
                location: {
                    ...prev.location,
                    [field]: field === 'coordinates'
                        ? value.split(',').map(Number)
                        : value,
                },
            }));
        } else if (name.startsWith('ticketPrice.')) {
            const field = name.split('.')[1];
            setSelectedMuseum((prev) => ({
                ...prev,
                ticketPrice: {
                    ...prev.ticketPrice,
                    [field]: Number(value),
                },
            }));
        } else {
            setSelectedMuseum((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };



    return (
        <div className="museums-list-page flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-5">My Created Museums and Historical Places</h1>
            <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                {museums.length === 0 ? (
                    <p className="text-center">No museums created yet.</p>
                ) : (
                    <ul className="museums-list">
                        {museums.map((museum) => (
                            <li key={museum.id} className="flex justify-between items-center p-4 border-b border-gray-300">
                                <div>
                                    <h3 className="font-semibold text-lg">{museum.name}</h3>
                                    <p>Description: {museum.description}</p>
                                    <p>Type: {museum.type || "Type not specified"}</p>
                                    <p>Location: {museum.location?.name || "Location not specified"}</p>
                                    <p>
                                        Coordinates: {museum.location?.coordinates
                                            ? `${museum.location.coordinates[0]}, ${museum.location.coordinates[1]}`
                                            : "Coordinates not available"}
                                    </p>
                                    <p>Opening Hours: {museum.openingHours}</p>
                                    <p>Ticket Prices:</p>
                                    <ul className="ticket-prices-list">
                                        <li>Foreigner: {museum.ticketPrice?.foreigner || "N/A"}</li>
                                        <li>Native: {museum.ticketPrice?.Native || "N/A"}</li>
                                        <li>Student: {museum.ticketPrice?.student || "N/A"}</li>
                                    </ul>
                                </div>
                                <p>Tags: {Array.isArray(museum.tags) ? museum.tags.join(', ') : "Tags not specified"}</p>
                                {museum.pictures && museum.pictures.length > 0 && (
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
                                <div className="flex gap-2">
                                    <EditButton onClick={() => handleEdit(museum)}>Edit</EditButton>
                                    <DeleteButton onClick={() => handleDelete(museum._id)}>Delete</DeleteButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Render the EditPlaceModal if editing */}
            {isEditing && selectedMuseum && (
                <EditPlaceModal
                    museum={selectedMuseum}
                    onChange={handleChange}
                    onUpdate={handleUpdate}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </div>
    );
};

export default MuseumsList;
