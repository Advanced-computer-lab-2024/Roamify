import React, { useState, useEffect } from 'react';
import UpdateButton from '../Buttons/UpdateButton'; // Import the UpdateButton component
import EditButton from '../Buttons/EditButton'; // Import the EditButton component
import DeleteButton from '../Buttons/DeleteButton'; // Import the DeleteButton component
import InputField from '../Modals/InputField'; // Import the InputField component
import './TourGuideItinerary.css'; // Import main CSS for styling

const EditTouristItinerary = () => {
    const [itinerary, setItinerary] = useState({
        activities: '',
        locations: '',
        startDate: '',
        endDate: '',
        tags: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    // Fetch the existing itinerary when the component mounts
    useEffect(() => {
        // Simulate fetching data from an API
        const fetchItinerary = async () => {
            // Placeholder data - replace with actual API call
            const fetchedItinerary = {
                activities: 'City Tour, Hiking Adventure',
                locations: 'Central Park, Downtown',
                startDate: '2024-10-10',
                endDate: '2024-10-15',
                tags: 'Adventure, Sightseeing',
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
            startDate: '',
            endDate: '',
            tags: '',
        });
    };

    return (
        <div className="edit-tourist-itinerary flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-5">Edit Tourist Itinerary</h1>
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

                {/* Start Date */}
                <InputField
                    label="Start Date"
                    type="date"
                    name="startDate"
                    value={itinerary.startDate}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />

                {/* End Date */}
                <InputField
                    label="End Date"
                    type="date"
                    name="endDate"
                    value={itinerary.endDate}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />

                {/* Tags */}
                <InputField
                    label="Tags (comma-separated)"
                    type="text"
                    name="tags"
                    value={itinerary.tags}
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

export default EditTouristItinerary;
