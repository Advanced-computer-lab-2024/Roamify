import React, { useEffect, useState } from "react";
import axios from "axios";
import InputField from "./InputFieldTourGuide"; // Import the InputField component
import UpdateButton from "../Buttons/UpdateButton"; // Import the UpdateButton component
const profileId = localStorage.getItem("profileId");

const EditItineraryModal = ({ itinerary, onChange, onClose }) => {
  const [localItinerary, setLocalItinerary] = useState(itinerary);

  useEffect(() => {
    console.log("Selected itinerary:", itinerary); // Debugging to ensure itinerary data is present
    setLocalItinerary(itinerary); // Sync local state with props when component mounts
  }, [itinerary]);

  // Ensure itinerary is properly populated before rendering
  if (!localItinerary) {
    return null;
  }

  // Handle input changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalItinerary((prev) => ({
      ...prev,
      [name]: value, // Update state
    }));

    if (onChange) {
      onChange(e); // Call parent onChange handler if provided
    }
  };

  // Handle form submission for updating the itinerary
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Convert the comma-separated activities to an array
    const formattedItinerary = {
      ...localItinerary,
      activities: localItinerary.activities
        ? localItinerary.activities
            .split(",")
            .map((activity) => activity.trim())
        : [],
    };

    try {
      // Update the itinerary with new data
      await axios.put(
        `http://localhost:3000/tourguide/update-itineary/${profileId}/${itinerary._id}`,
        formattedItinerary
      );
      console.log("Updated Itinerary:", formattedItinerary);
      onClose(); // Close the modal after successful update
      window.location.reload(); // Refresh the itineraries list after update
    } catch (error) {
      console.error("Error updating itinerary:", error.message);
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
            value={localItinerary.activities || ""}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Language"
            type="text"
            name="language"
            value={localItinerary.language || ""}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Price"
            type="number"
            name="price"
            value={localItinerary.price || ""}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Available Dates"
            type="text"
            name="availableDates"
            value={
              Array.isArray(localItinerary.availableDates)
                ? localItinerary.availableDates
                    .map((date) => new Date(date).toISOString().split("T")[0])
                    .join(", ")
                : ""
            }
            onChange={handleInputChange}
            placeholder="Enter dates separated by commas (YYYY-MM-DD)"
            required
          />
          <InputField
            label="Pick-up Location"
            type="text"
            name="pickUpLocation"
            value={localItinerary.pickUpLocation || ""}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Drop-off Location"
            type="text"
            name="dropOffLocation"
            value={localItinerary.dropOffLocation || ""}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Accessibility"
            type="text"
            name="accessibility"
            value={localItinerary.accessibility ? "Yes" : "No"}
            onChange={handleInputChange}
            placeholder="Yes or No"
            required
          />
          <InputField
            label="Booked"
            type="text"
            name="booked"
            value={localItinerary.booked ? "Yes" : "No"}
            onChange={handleInputChange}
            placeholder="Yes or No"
          />
          <InputField
            label="Rating"
            type="number"
            name="rating"
            value={localItinerary.rating || ""}
            onChange={handleInputChange}
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
