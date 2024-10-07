import React, { useState } from 'react';
import SubmitButton from '../Buttons/SubmitButton'; // Import the SubmitButton component
import InputField from '../Modals/InputField'; // Import the InputField component
import './TourGuideItinerary.css'; // Import main CSS for styling

const CreateTouristItinerary = () => {
    const [itinerary, setItinerary] = useState({
        activities: '',
        locations: '',
        startDate: '',
        endDate: '',
        tags: '',
    });

    // Handle input changes
    const handleInputChange = (name, value) => {
        setItinerary({ ...itinerary, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add the code to submit the itinerary to the backend
        console.log('Tourist Itinerary Created:', itinerary);
        // Reset the form
        setItinerary({
            activities: '',
            locations: '',
            startDate: '',
            endDate: '',
            tags: '',
        });
    };

    return (
        <div className="create-tourist-itinerary flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-5">Create Tourist Itinerary</h1>
            <form
                className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md"
                onSubmit={handleSubmit}
            >
                {/* Activities */}
                <InputField
                    label="Activities"
                    type="text"
                    name="activities"
                    value={itinerary.activities}
                    onChange={handleInputChange}
                    required
                />

                {/* Locations to be Visited */}
                <InputField
                    label="Locations to be Visited"
                    type="text"
                    name="locations"
                    value={itinerary.locations}
                    onChange={handleInputChange}
                    required
                />

                {/* Start Date */}
                <InputField
                    label="Start Date"
                    type="date"
                    name="startDate"
                    value={itinerary.startDate}
                    onChange={handleInputChange}
                    required
                />

                {/* End Date */}
                <InputField
                    label="End Date"
                    type="date"
                    name="endDate"
                    value={itinerary.endDate}
                    onChange={handleInputChange}
                    required
                />

                {/* Tags */}
                <InputField
                    label="Tags (comma-separated)"
                    type="text"
                    name="tags"
                    value={itinerary.tags}
                    onChange={handleInputChange}
                    required
                />

                {/* Submit Button */}
                <SubmitButton type="submit">Create Itinerary</SubmitButton>
            </form>
        </div>
    );
};

export default CreateTouristItinerary;
