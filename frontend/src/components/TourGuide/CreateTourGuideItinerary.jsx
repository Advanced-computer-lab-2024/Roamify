import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import SubmitButton from '../Buttons/SubmitButton'; // Import the SubmitButton component
import InputField from '../Modals/InputField'; // Import the InputField component
import './TourGuideItinerary.css'; // Import main CSS for styling
const profileId = localStorage.getItem('profileId');


const CreateTourGuideItinerary = () => {
    const [itinerary, setItinerary] = useState({
        activities: '', // Should be an array of activity IDs
        locations: '', // Should be an array of strings (locations)
        language: '',
        price: '',
        availableDates: '', // Should be an array of dates
        preferenceTags: '', // Should be an array of preference tag IDs
        pickUpLocation: '',
        dropOffLocation: '',
        accessibility: false,
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Handle boolean and array fields
        if (name === 'accessibility') {
            setItinerary((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else if (['availableDates', 'locations', 'preferenceTags', 'activities'].includes(name)) {
            setItinerary((prev) => ({
                ...prev,
                [name]: value.split(',').map((item) => item.trim()),
            }));
        } else {
            setItinerary((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make POST request to create a new itinerary
            const response = await axios.post(`http://localhost:3000/tour-guide/create-itineary/${profileId}`, itinerary);
            console.log('Itinerary Created:', response.data);
            // Reset the form after successful submission
            setItinerary({
                activities: '',
                language: '',
                price: '',
                availableDates: '',
                pickUpLocation: '',
                dropOffLocation: '',
                accessibility: false,
            });
        } catch (error) {
            console.error('Error creating itinerary:', error.response?.data?.message || error.message);
        }
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
                    type="number"
                    name="price"
                    value={itinerary.price}
                    onChange={handleInputChange}
                    required
                />

                {/* Available Dates */}
                <InputField
                    label="Available Dates (comma-separated YYYY-MM-DD)"
                    type="text"
                    name="availableDates"
                    value={itinerary.availableDates}
                    onChange={handleInputChange}
                    required
                />

                {/* Pick-up Location */}
                <InputField
                    label="Pick-up Location"
                    type="text"
                    name="pickUpLocation"
                    value={itinerary.pickUpLocation}
                    onChange={handleInputChange}
                    required
                />

                {/* Drop-off Location */}
                <InputField
                    label="Drop-off Location"
                    type="text"
                    name="dropOffLocation"
                    value={itinerary.dropOffLocation}
                    onChange={handleInputChange}
                    required
                />

                {/* Accessibility */}
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="accessibility"
                        checked={itinerary.accessibility}
                        onChange={handleInputChange}
                    />
                    <span>Accessible</span>
                </label>

                {/* Submit Button */}
                <SubmitButton type="submit">Create Itinerary</SubmitButton>
            </form>
        </div>
    );
};

export default CreateTourGuideItinerary;
