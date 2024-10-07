import React, { useState, useEffect } from 'react';
import UpdateButton from '../Buttons/UpdateButton'; // Import the UpdateButton component
import EditButton from '../Buttons/EditButton'; // Import the EditButton component
import DeleteButton from '../Buttons/DeleteButton'; // Import the DeleteButton component
import InputField from '../Modals/InputField'; // Import the InputField component
import './TourGuideItinerary.css'; // Import main CSS for styling

const EditTourGuideItinerary = () => {
    const [itinerary, setItinerary] = useState({
        activities: '',
        locations: '',
        timeline: '',
        duration: '',
        language: '',
        price: '',
        availableDates: '',
        accessibility: '',
        pickupDropoff: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    // Fetch the existing itinerary when the component mounts
    useEffect(() => {
        // Simulate fetching data from an API
        const fetchItinerary = async () => {
            // Placeholder data - replace with actual API call
            const fetchedItinerary = {
                activities: 'City Tour, Museum Visit',
                locations: 'City Center, National Museum',
                timeline: '9:00 AM - 4:00 PM',
                duration: '1 hour per activity',
                language: 'English, French',
                price: '50 USD',
                availableDates: 'Every Monday and Wednesday',
                accessibility: 'Wheelchair accessible',
                pickupDropoff: 'Main Square',
            };
            setItinerary(fetchedItinerary);
        };

        fetchItinerary();
    }, []);

    // Handle input changes
    const handleInputChange = (name, value) => {
        setItinerary({ ...itinerary, [name]: value });
    };

    // Handle form submission to update the itinerary
    const handleUpdate = () => {
        // Here you can add the code to update the itinerary in the backend
        console.log('Itinerary updated:', itinerary);
        setIsEditing(false);
    };

    // Handle deletion of the itinerary
    const handleDelete = () => {
        // Here you can add the code to delete the itinerary from the backend
        console.log('Itinerary deleted');
        // Reset the form or navigate away after deletion
        setItinerary({
            activities: '',
            locations: '',
            timeline: '',
            duration: '',
            language: '',
            price: '',
            availableDates: '',
            accessibility: '',
            pickupDropoff: '',
        });
    };

    return (
        <div className="edit-tour-guide-itinerary flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-5">Edit Tour Guide Itinerary</h1>
            <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                {/* Activities */}
                <InputField
                    label="Activities"
                    type="text"
                    name="activities"
                    value={itinerary.activities}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />

                {/* Locations to be Visited */}
                <InputField
                    label="Locations to be Visited"
                    type="text"
                    name="locations"
                    value={itinerary.locations}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />

                {/* Timeline */}
                <InputField
                    label="Timeline"
                    type="text"
                    name="timeline"
                    value={itinerary.timeline}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />

                {/* Duration of Each Activity */}
                <InputField
                    label="Duration of Each Activity"
                    type="text"
                    name="duration"
                    value={itinerary.duration}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />

                {/* Language of Tour */}
                <InputField
                    label="Language of Tour"
                    type="text"
                    name="language"
                    value={itinerary.language}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />

                {/* Price of Tour */}
                <InputField
                    label="Price of Tour"
                    type="text"
                    name="price"
                    value={itinerary.price}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />

                {/* Available Dates and Times */}
                <InputField
                    label="Available Dates and Times"
                    type="text"
                    name="availableDates"
                    value={itinerary.availableDates}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />

                {/* Accessibility */}
                <InputField
                    label="Accessibility"
                    type="text"
                    name="accessibility"
                    value={itinerary.accessibility}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />

                {/* Pick-up/Drop-off Location */}
                <InputField
                    label="Pick-up/Drop-off Location"
                    type="text"
                    name="pickupDropoff"
                    value={itinerary.pickupDropoff}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-5">
                    {isEditing ? (
                        <>
                            <UpdateButton onClick={handleUpdate}>Update Itinerary</UpdateButton>
                            <DeleteButton onClick={handleDelete}>Delete Itinerary</DeleteButton>
                        </>
                    ) : (
                        <EditButton onClick={() => setIsEditing(true)}>Edit Itinerary</EditButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditTourGuideItinerary;
