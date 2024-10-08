import React, { useEffect } from "react";
import axios from "axios";
import InputField from "./InputFieldAdvertiser"; // Import the InputField component
import UpdateButton from "../Buttons/UpdateButton"; // Import the UpdateButton component
const profileId = localStorage.getItem("profileId");

const EditActivityModal = ({
  activity,
  onChange,
  onClose,
  refreshActivities,
}) => {
  useEffect(() => {
    console.log("Selected activity:", activity); // Debugging to ensure activity data is present
  }, [activity]);

  // Ensure activity is properly populated before rendering
  if (!activity) {
    return null;
  }

  // Convert the date to the correct format for the input type="date"
  const formattedDate = activity.date
    ? new Date(activity.date).toISOString().split("T")[0]
    : "";

  // Convert the time to the correct format for the input type="time"
  const formattedTime = activity.time ? activity.time.slice(0, 5) : "";

  // Ensure the price and specialDiscounts are formatted as strings for input fields
  const formattedPrice = activity.price ? String(activity.price) : "";
  const formattedSpecialDiscounts = activity.discounts
    ? String(activity.discounts)
    : "";

  // Format the tags (assuming `activity.tag` is an array of objects with a `name` field)
  const formattedTags = Array.isArray(activity.tag)
    ? activity.tag.map((t) => t.name).join(", ")
    : "";

  // Handle updating the activity
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Update the activity with new data
      await axios.put(
        `http://localhost:3000/advertiser/update-activity/${profileId}/${activity._id}`,
        activity
      );
      console.log("Updated Activity:", activity);
      onClose(); // Close the modal after successful update
      window.location.reload(); // Refresh the activities list after update
    } catch (error) {
      console.error("Error updating activity:", error.message);
    }
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="modal-content bg-white p-6 rounded shadow-md w-full max-w-lg max-h-screen overflow-auto">
        <h2 className="text-xl font-bold mb-6">Edit Activity</h2>
        <form onSubmit={handleUpdate}>
          <InputField
            label="Name"
            type="text"
            name="name"
            value={activity.name} // Format date to YYYY-MM-DD
            onChange={onChange}
            required
          />
          <InputField
            label="Date"
            type="date"
            name="date"
            value={formattedDate} // Format date to YYYY-MM-DD
            onChange={onChange}
            required
          />
          <InputField
            label="Time"
            type="time"
            name="time"
            value={formattedTime} // Format time to HH:MM
            onChange={onChange}
            required
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={activity.location?.name || ""} // Assuming location is an object with a name property
              onChange={onChange}
              placeholder="Enter location or select on map"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <InputField
            label="Price (or Price Range)"
            type="text"
            name="price"
            value={formattedPrice} // Format price as a string
            onChange={onChange}
            required
          />
          <InputField
            label="Category"
            type="text"
            name="category"
            value={activity.category?.name || ""} // Assuming category is an object with a name property
            onChange={onChange}
            required
          />
          <InputField
            label="Tags"
            type="text"
            name="tag" // Change from "tags" to "tag" to match model
            value={formattedTags} // Convert array to comma-separated string
            onChange={onChange}
            placeholder="Enter tags separated by commas"
          />
          <InputField
            label="Special Discounts"
            type="text"
            name="specialDiscounts"
            value={formattedSpecialDiscounts} // Format specialDiscounts as a string
            onChange={onChange}
          />
          <div className="mt-6 flex justify-between">
            <UpdateButton type="submit">Update Activity</UpdateButton>
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

export default EditActivityModal;
