import React, { useState } from 'react';
import SubmitButton from '../Buttons/SubmitButton'; // Import the SubmitButton component
import InputField from '../Modals/InputField'; // Import the InputField component
import './TourGuideItinerary.css'; // Import main CSS for styling

const CreateTourGuideItinerary = () => {
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

    // Handle input changes
    const handleInputChange = (name, value) => {
        setItinerary({ ...itinerary, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add the code to submit the itinerary to the backend
        console.log('Tour Guide Itinerary Created:', itinerary);
        // Reset the form
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
        <div className="create-tour-guide-itinerary flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-5">Create Tour Guide Itinerary</h1>
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

                {/* Timeline */}
                <InputField
                    label="Timeline"
                    type="text"
                    name="timeline"
                    value={itinerary.timeline}
                    onChange={handleInputChange}
                    required
                />

                {/* Duration of Each Activity */}
                <InputField
                    label="Duration of Each Activity"
                    type="text"
                    name="duration"
                    value={itinerary.duration}
                    onChange={handleInputChange}
                    required
                />

                {/* Language of Tour */}
                <InputField
                    label="Language of Tour"
                    type="text"
                    name="language"
                    value={itinerary.language}
                    onChange={handleInputChange}
                    required
                />

                {/* Price of Tour */}
                <InputField
                    label="Price of Tour"
                    type="text"
                    name="price"
                    value={itinerary.price}
                    onChange={handleInputChange}
                    required
                />

                {/* Available Dates and Times */}
                <InputField
                    label="Available Dates and Times"
                    type="text"
                    name="availableDates"
                    value={itinerary.availableDates}
                    onChange={handleInputChange}
                    required
                />

                {/* Accessibility */}
                <InputField
                    label="Accessibility"
                    type="text"
                    name="accessibility"
                    value={itinerary.accessibility}
                    onChange={handleInputChange}
                />

                {/* Pick-up/Drop-off Location */}
                <InputField
                    label="Pick-up/Drop-off Location"
                    type="text"
                    name="pickupDropoff"
                    value={itinerary.pickupDropoff}
                    onChange={handleInputChange}
                    required
                />

                {/* Submit Button */}
                <SubmitButton type="submit">Create Itinerary</SubmitButton>
            </form>
        </div>
    );
};

export default CreateTourGuideItinerary;
