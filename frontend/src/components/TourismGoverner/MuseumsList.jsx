import React, { useState, useEffect } from 'react';
import EditButton from '../Buttons/EditButton'; // Import the EditButton component
import DeleteButton from '../Buttons/DeleteButton'; // Import the DeleteButton component
import './TourismGovernerPage.css'; // Import main CSS for styling

const MuseumsList = () => {
    const [museums, setMuseums] = useState([]);

    // Fetch the list of museums when the component mounts
    useEffect(() => {
        const fetchMuseums = async () => {
            // Simulate fetching data from an API
            const fetchedMuseums = [
                {
                    id: 1,
                    name: 'National History Museum',
                    description: 'A museum showcasing the history and culture of the region.',
                    location: 'Downtown City Center',
                    openingHours: '9:00 AM - 5:00 PM',
                    ticketPrices: {
                        foreigner: '20 USD',
                        native: '10 USD',
                        student: '5 USD',
                    },
                },
                {
                    id: 2,
                    name: 'Ancient Civilization Museum',
                    description: 'A museum featuring artifacts from ancient civilizations.',
                    location: 'Historic District',
                    openingHours: '10:00 AM - 6:00 PM',
                    ticketPrices: {
                        foreigner: '25 USD',
                        native: '15 USD',
                        student: '8 USD',
                    },
                },
            ];
            setMuseums(fetchedMuseums);
        };

        fetchMuseums();
    }, []);

    // Handle delete museum
    const handleDelete = (museumId) => {
        // Here you can add the code to delete the museum from the backend
        const updatedMuseums = museums.filter((museum) => museum.id !== museumId);
        setMuseums(updatedMuseums);
        console.log('Museum deleted:', museumId);
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
                                    <p>Location: {museum.location}</p>
                                    <p>Opening Hours: {museum.openingHours}</p>
                                    <p>Ticket Prices:</p>
                                    <ul className="ticket-prices-list">
                                        <li>Foreigner: {museum.ticketPrices.foreigner}</li>
                                        <li>Native: {museum.ticketPrices.native}</li>
                                        <li>Student: {museum.ticketPrices.student}</li>
                                    </ul>
                                </div>
                                <div className="flex gap-2">
                                    <EditButton>Edit</EditButton>
                                    <DeleteButton onClick={() => handleDelete(museum.id)}>Delete</DeleteButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MuseumsList;
