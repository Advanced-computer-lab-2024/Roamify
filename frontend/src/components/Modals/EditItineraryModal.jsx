import React, { useEffect } from 'react';
import axios from 'axios';
import InputField from './InputField'; // Import the InputField component
import UpdateButton from '../Buttons/UpdateButton'; // Import the UpdateButton component

const EditItineraryModal = ({ itinerary, onChange, onClose }) => {
    useEffect(() => {
        console.log('Selected itinerary:', itinerary); // Debugging to ensure itinerary data is present
    }, [itinerary]);

    // Ensure itinerary is properly populated before rendering
    if (!itinerary) {
        return null;
    }

    // Convert availableDates to a comma-separated string for input
    const formattedAvailableDates = Array.isArray(itinerary.availableDates) ? itinerary.availableDates.map(date => new Date(date).toISOString().split('T')[0]).join(', ') : '';

    // Ensure price and accessibility are formatted properly for input fields
    const formattedPrice = itinerary.price ? String(itinerary.price) : '';
    const formattedAccessibility = itinerary.accessibility ? "Yes" : "No";
    const formattedPreferenceTags = Array.isArray(itinerary.preferenceTags) ? itinerary.preferenceTags.join(', ') : '';

    // Handle updating the itinerary
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            // Update the itinerary with new data
            await axios.put(`http://localhost:3000/tour-guide/update-itineary/67040948717d1b8440b48667/${itinerary._id}`, itinerary);
            console.log('Updated Itinerary:', itinerary);
            onClose(); // Close the modal after successful update
            window.location.reload(); // Refresh the itineraries list after update
        } catch (error) {
            console.error('Error updating itinerary:', error.message);
        }
    };

    return (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="modal-content bg-white p-6 rounded shadow-md w-full max-w-lg max-h-screen overflow-auto">
                <h2 className="text-xl font-bold mb-6">Edit Itinerary</h2>
                <form onSubmit={handleUpdate}>
                    <InputField
                        label="Activities"
                        type="text"
                        name="activities"
                        value={Array.isArray(itinerary.activities) ? itinerary.activities.join(', ') : ''}
                        onChange={onChange}
                        required>

                    </InputField>
                    <InputField
                        label="Language"
                        type="text"
                        name="language"
                        value={itinerary.language || ''}
                        onChange={onChange}
                        required
                    />
                    <InputField
                        label="Price"
                        type="number"
                        name="price"
                        value={formattedPrice}
                        onChange={onChange}
                        required
                    />
                    <InputField
                        label="Available Dates"
                        type="text"
                        name="availableDates"
                        value={formattedAvailableDates}
                        onChange={onChange}
                        placeholder="Enter dates separated by commas (YYYY-MM-DD)"
                        required
                    />
                    <InputField
                        label="Pick-up Location"
                        type="text"
                        name="pickUpLocation"
                        value={itinerary.pickUpLocation || ''}
                        onChange={onChange}
                        required
                    />
                    <InputField
                        label="Drop-off Location"
                        type="text"
                        name="dropOffLocation"
                        value={itinerary.dropOffLocation || ''}
                        onChange={onChange}
                        required
                    />
                    <InputField
                        label="Accessibility"
                        type="text"
                        name="accessibility"
                        value={formattedAccessibility}
                        onChange={onChange}
                        placeholder="Yes or No"
                        required
                    />
                    <InputField
                        label="Booked"
                        type="text"
                        name="booked"
                        value={itinerary.booked ? "Yes" : "No"}
                        onChange={onChange}
                        placeholder="Yes or No"
                    />
                    <InputField
                        label="Rating"
                        type="number"
                        name="rating"
                        value={itinerary.rating || ''}
                        onChange={onChange}
                    />

                    <div className="mt-6 flex justify-between">
                        <UpdateButton type="submit">Update Itinerary</UpdateButton>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 bg-red-500 text-white rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditItineraryModal;
