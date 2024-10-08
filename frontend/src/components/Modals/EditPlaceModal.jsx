import React, { useEffect } from "react";
import axios from "axios";
import InputField from "./InputFieldTourismGoverner"; // Import the InputField component
import UpdateButton from "../Buttons/UpdateButton"; // Import the UpdateButton component

const EditPlaceModal = ({ museum, onChange, onClose, onUpdate }) => {
  useEffect(() => {
    console.log("Selected Place:", museum); // Debugging to ensure museum data is present
  }, [museum]);

  // Ensure museum is properly populated before rendering
  if (!museum) {
    return null;
  }

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="modal-content bg-white p-6 rounded shadow-md w-full max-w-lg max-h-screen overflow-auto">
        <h2 className="text-xl font-bold mb-6">Edit Historical Place</h2>
        <form onSubmit={onUpdate}>
          {/* Type */}
          <label className="flex flex-col mb-4">
            Type:
            <select
              name="type"
              value={museum.type || "museum"}
              onChange={onChange}
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
            value={museum.name || ""} // Add a fallback value
            onChange={onChange}
            required
          />

          {/* Description */}
          <InputField
            label="Description"
            type="textarea"
            name="description"
            value={museum.description || ""} // Add a fallback value
            onChange={onChange}
            rows="4"
            required
          />

          {/* Longitude and Latitude */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">
              Coordinates
            </h3>
            <InputField
              label="Longitude"
              type="number"
              name="location.coordinates[0]"
              value={
                museum.location?.coordinates
                  ? museum.location.coordinates[0]
                  : ""
              } // Fallback value for longitude
              onChange={(e) => {
                const { value } = e.target;
                onChange({
                  target: {
                    name: "location.coordinates",
                    value: `${value}, ${museum.location?.coordinates[1]}`,
                  },
                });
              }}
              required
            />
            <InputField
              label="Latitude"
              type="number"
              name="location.coordinates[1]"
              value={
                museum.location?.coordinates
                  ? museum.location.coordinates[1]
                  : ""
              } // Fallback value for latitude
              onChange={(e) => {
                const { value } = e.target;
                onChange({
                  target: {
                    name: "location.coordinates",
                    value: `${museum.location?.coordinates[0]}, ${value}`,
                  },
                });
              }}
              required
            />
          </div>

          {/* Ticket Prices */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">
              Ticket Prices
            </h3>
            <InputField
              label="Foreigner Price"
              type="number"
              name="ticketPrice.foreigner"
              value={museum.ticketPrice?.foreigner || ""} // Fallback value
              onChange={(e) => {
                const { value } = e.target;
                onChange({
                  target: {
                    name: "ticketPrice.foreigner",
                    value: value,
                  },
                });
              }}
            />
            <InputField
              label="Native Price"
              type="number"
              name="ticketPrice.Native"
              value={museum.ticketPrice?.Native || ""} // Fallback value
              onChange={(e) => {
                const { value } = e.target;
                onChange({
                  target: {
                    name: "ticketPrice.Native",
                    value: value,
                  },
                });
              }}
            />
            <InputField
              label="Student Price"
              type="number"
              name="ticketPrice.student"
              value={museum.ticketPrice?.student || ""} // Fallback value
              onChange={(e) => {
                const { value } = e.target;
                onChange({
                  target: {
                    name: "ticketPrice.student",
                    value: value,
                  },
                });
              }}
            />
          </div>

          {/* Pictures */}
          <label className="flex flex-col mb-4">
            Picture:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                onChange({
                  target: {
                    name: "picture",
                    value: e.target.files[0],
                  },
                });
              }}
              className="p-2 border rounded-md mt-1"
            />
            {museum.picture && (
              <img
                src={
                  typeof museum.picture === "string"
                    ? museum.picture
                    : URL.createObjectURL(museum.picture)
                }
                alt="Place Preview"
                className="mt-3 w-32 h-32 object-cover"
              />
            )}
          </label>

          {/* Tags */}
          <InputField
            label="Tags (comma separated)"
            type="text"
            name="tags"
            value={Array.isArray(museum.tags) ? museum.tags.join(", ") : ""} // Convert array to comma-separated string
            onChange={(e) => {
              const { value } = e.target;
              onChange({
                target: {
                  name: "tags",
                  value: value.split(",").map((tag) => tag.trim()), // Split by commas and trim spaces
                },
              });
            }}
          />

          {/* Action Buttons */}
          <div className="mt-6 flex justify-between">
            <UpdateButton type="submit">Update Historical Place</UpdateButton>
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

export default EditPlaceModal;
