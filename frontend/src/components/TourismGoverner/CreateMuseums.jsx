import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import SubmitButton from "../Buttons/SubmitButton"; // Import the SubmitButton component
import InputField from "../Modals/InputFieldTourismGoverner"; // Import the InputField component
import "./TourismGovernerPage.css"; // Import main CSS for styling
const profileId = localStorage.getItem("profileId");

const CreateMuseums = () => {
  const [museum, setMuseum] = useState({
    type: "museum", // Default type
    name: "",
    description: "",
    tagPlace: "", // Comma-separated tags
    pictures: "", // Comma-separated picture URLs
    location: {
      type: "Point",
      coordinates: ["", ""], // [longitude, latitude]
    },
    ticketPrice: {
      foreigner: "",
      Native: "",
      student: "",
    },
  });

  const userId = localStorage.getItem("userId");

  // Handle input changes
  const handleChange = (e) => {
    if (!e || !e.target) {
      return; // Exit early if e or e.target is undefined
    }

    const { name, value } = e.target;

    // Handle ticketPrice fields
    if (["foreigner", "Native", "student"].includes(name)) {
      setMuseum((prevMuseum) => ({
        ...prevMuseum,
        ticketPrice: {
          ...prevMuseum.ticketPrice,
          [name]: value, // Update ticketPrice field
        },
      }));
    }
    // Handle coordinates fields
    else if (
      name === "coordinates longitude" ||
      name === "coordinates latitude"
    ) {
      const index = name === "coordinates longitude" ? 0 : 1;
      setMuseum((prevMuseum) => ({
        ...prevMuseum,
        location: {
          ...prevMuseum.location,
          coordinates: prevMuseum.location.coordinates.map((coord, idx) =>
            idx === index ? value : coord
          ),
        },
      }));
    }
    // Handle general fields like name, description, tags, pictures
    else {
      setMuseum((prevMuseum) => ({
        ...prevMuseum,
        [name]: value, // Update general fields
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert comma-separated tags and pictures to arrays
    const formattedMuseum = {
      ...museum,
      tagPlace: museum.tags.split(",").map((tag) => tag.trim()), // Convert tags to array
      pictures: museum.pictures.split(",").map((pic) => pic.trim()), // Convert pictures to array
    };

    try {
      // console.log(formattedMuseum.t)
      // Make POST request to create a new place
      const response = await axios.post(
        `http://localhost:3000/tourismgoverner/create-place/${userId}`,
        formattedMuseum
      );
      console.log("Place Created:", response.data);
      // Reset the form after successful submission
      setMuseum({
        type: "museum",
        name: "",
        description: "",
        tagPlace: "",
        pictures: "",
        location: {
          type: "Point",
          coordinates: ["", ""],
        },
        ticketPrice: {
          foreigner: "",
          Native: "",
          student: "",
        },
      });
    } catch (error) {
      console.error(
        "Error creating place:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="create-museum flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-5">
        Create Museum or Historical Place
      </h1>
      <form
        className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        {/* Type Dropdown */}
        <label className="flex flex-col">
          Type:
          <select
            name="type"
            value={museum.type}
            onChange={handleChange}
            className="p-2 border rounded-md mt-1"
            required
          >
            <option value="museum">Museum</option>
            <option value="historical_site">Historical Site</option>
          </select>
        </label>

        {/* Name */}
        <InputField
          label="Name"
          type="text"
          name="name"
          value={museum.name}
          onChange={handleChange}
          required
        />

        {/* Description */}
        <InputField
          label="Description"
          type="textarea"
          name="description"
          value={museum.description}
          onChange={handleChange}
          rows="4"
          required
        />

        {/* Tags */}
        <InputField
          label="Tags (comma-separated)"
          type="text"
          name="tags"
          value={museum.tags}
          onChange={handleChange}
        />

        {/* Pictures */}
        <InputField
          label="Pictures (comma-separated URLs)"
          type="text"
          name="pictures"
          value={museum.pictures}
          onChange={handleChange}
        />

        {/* Location Coordinates */}
        <h3 className="font-semibold mt-4">Location Coordinates</h3>
        <InputField
          label="Longitude"
          type="number"
          name="coordinates longitude"
          value={museum.location.coordinates[0]}
          onChange={handleChange}
          required
        />
        <InputField
          label="Latitude"
          type="number"
          name="coordinates latitude"
          value={museum.location.coordinates[1]}
          onChange={handleChange}
          required
        />

        {/* Ticket Prices */}
        <h3 className="font-semibold mt-4">Ticket Prices</h3>
        <InputField
          label="Foreigner Price"
          type="number"
          name="foreigner"
          value={museum.ticketPrice.foreigner}
          onChange={handleChange}
          required
        />
        <InputField
          label="Native Price"
          type="number"
          name="Native"
          value={museum.ticketPrice.Native}
          onChange={handleChange}
          required
        />
        <InputField
          label="Student Price"
          type="number"
          name="student"
          value={museum.ticketPrice.student}
          onChange={handleChange}
          required
        />

        {/* Submit Button */}
        <SubmitButton type="submit">Create Place</SubmitButton>
      </form>
    </div>
  );
};

export default CreateMuseums;
