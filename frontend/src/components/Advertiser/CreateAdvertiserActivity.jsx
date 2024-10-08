import React, { useState } from "react";
import axios from "axios"; // Import axios for HTTP requests
import SubmitButton from "../Buttons/SubmitButton"; // Import the SubmitButton component
import InputField from "../Modals/InputFieldAdvertiser"; // Import the InputField component
import "./AdvertiserPage.css"; // Import main CSS for styling
const profileId = localStorage.getItem("profileId");

const CreateAdvertiserActivity = () => {
  const [activity, setActivity] = useState({
    name: "",
    date: "",
    time: "",
    location: {
      type: "Point", // Default to 'Point'
      name: "",
      coordinates: ["", ""], // [longitude, latitude]
    },
    price: "",
    category: "",
    tagPlace: "", // Changed to match the controller
    discounts: "", // Added discounts field to match the controller
  });

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;

      if (name === "price") {
        // Check if the value contains a comma, indicating a price range
        if (value.includes(",")) {
          // Split the value into an array of two numbers (for a range)
          const priceRange = value.split(",").map(Number);
          setActivity((prevActivity) => ({
            ...prevActivity,
            [name]: priceRange,
          }));
        } else {
          // Handle a single price
          setActivity((prevActivity) => ({
            ...prevActivity,
            [name]: Number(value),
          }));
        }
      } else if (name.startsWith("location")) {
        const field = name.split(" ")[1]; // Extract the field name after 'location'
        setActivity((prevActivity) => ({
          ...prevActivity,
          location: {
            ...prevActivity.location,
            [field]:
              field === "coordinates" ? value.split(",").map(Number) : value,
          },
        }));
      } else {
        setActivity((prevActivity) => ({
          ...prevActivity,
          [name]: value,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make POST request to create a new activity
      const response = await axios.post(
        `http://localhost:3000/advertiser/create-activity/${profileId}`,
        activity
      );
      console.log("New Activity Created:", response.data);
      // Optional: Reset the form or redirect after successful submission
      setActivity({
        name: "",
        date: "",
        time: "",
        location: {
          type: "Point",
          name: "",
          coordinates: ["", ""],
        },
        price: "",
        category: "",
        tagPlace: "", // Reset tagPlace
        discounts: "", // Reset discounts
      });
    } catch (error) {
      console.error(
        "Error creating activity:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="create-advertiser-activity max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-6">Create New Activity</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Name"
          type="text"
          name="name"
          value={activity.name}
          onChange={handleChange}
          required
        />
        <InputField
          label="Date"
          type="date"
          name="date"
          value={activity.date}
          onChange={handleChange}
          required
        />
        <InputField
          label="Time"
          type="time"
          name="time"
          value={activity.time}
          onChange={handleChange}
          required
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location Type
          </label>
          <input
            type="text"
            name="location type"
            value={activity.location.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location Name
          </label>
          <input
            type="text"
            name="location name"
            value={activity.location.name}
            onChange={handleChange}
            placeholder="Enter location name"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Coordinates (Longitude, Latitude)
          </label>
          <input
            type="text"
            name="location coordinates"
            value={activity.location.coordinates.join(", ")}
            onChange={handleChange}
            placeholder="Enter coordinates as 'longitude, latitude'"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <InputField
          label="Price (or Price Range)"
          type="text" // Change type to 'text' since it can now accept a comma-separated string for the range
          name="price"
          value={
            Array.isArray(activity.price)
              ? activity.price.join(", ")
              : activity.price
          }
          onChange={handleChange}
          placeholder="Enter single price or price range (e.g., 100 or 100,200)"
          required
        />

        <InputField
          label="Category"
          type="text"
          name="category"
          value={activity.category}
          onChange={handleChange}
          required
        />
        <InputField
          label="Tags"
          type="text"
          name="tagPlace" // Changed to match the controller
          value={activity.tagPlace}
          onChange={handleChange}
          placeholder="Enter tags separated by commas"
        />
        <InputField
          label="Special Discounts"
          type="text"
          name="discounts" // Added discounts field
          value={activity.discounts}
          onChange={handleChange}
        />
        <div className="mt-6">
          <SubmitButton type="submit">Create Activity</SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default CreateAdvertiserActivity;
