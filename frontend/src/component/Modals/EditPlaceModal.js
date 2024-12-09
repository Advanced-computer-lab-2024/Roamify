import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const EditPlaceModal = ({ isOpen, onClose, fieldsValues, onSubmit }) => {
  const modalRef = useRef(null);
  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);

  // Fetch tags when the modal is opened
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/historical-tag/get-all"
        );
        setTags(res.data.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  // Initialize form data with incoming field values
  useEffect(() => {
    setFormData({
      type: fieldsValues?.type || "",
      name: fieldsValues?.name || "",
      description: fieldsValues?.description || "",
      location: fieldsValues?.location || {
        type: "Point",
        coordinates: [0, 0],
        name: "",
      },
      tagPlace: fieldsValues?.tagPlace || [], // Ensuring tagPlace is an array of strings
      openingHours: fieldsValues?.openingHours || "",
      closingHours: fieldsValues?.closingHours || "",
      ticketPrice: {
        Native: fieldsValues?.ticketPrice?.Native || "",
        Foreigner: fieldsValues?.ticketPrice?.Foreigner || "",
        Student: fieldsValues?.ticketPrice?.Student || "",
      },
      placesImages: fieldsValues?.placesImages || [],
    });
    setImagePreviews(
      fieldsValues?.placesImages?.map((img) => URL.createObjectURL(img)) || []
    );
  }, [fieldsValues]);

  // Handle image selection
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      placesImages: [...prev.placesImages, ...files],
    }));
    setImagePreviews((prev) => [...prev, ...filePreviews]);
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle location-specific changes
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [name]: value },
    }));
  };

  // Handle ticket price changes
  const handleTicketChange = (category, e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      ticketPrice: {
        ...prev.ticketPrice,
        [category]: value,
      },
    }));
  };

  // Handle tag selection/deselection
  const handleTagPlaceChange = (tagId) => {
    setFormData((prev) => {
      const tagPlace = prev.tagPlace.includes(tagId)
        ? prev.tagPlace.filter((id) => id !== tagId)
        : [...prev.tagPlace, tagId];
      return { ...prev, tagPlace };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = new FormData();

    // Append non-file fields to FormData
    submissionData.append("type", formData.type);
    submissionData.append("name", formData.name);
    submissionData.append("description", formData.description);
    submissionData.append("location", JSON.stringify(formData.location)); // Location as JSON string
    submissionData.append("openingHours", formData.openingHours);
    submissionData.append("closingHours", formData.closingHours);
    submissionData.append("ticketPrice", JSON.stringify(formData.ticketPrice)); // Ticket prices as JSON string
    submissionData.append("tagPlace", JSON.stringify(formData.tagPlace)); // Tags as JSON string

    // Append image files
    formData.placesImages.forEach((image) => {
      submissionData.append("placesImages", image);
    });

    // Submit the form data
    try {
      await axios.put(
        `http://localhost:3000/api/place/update/${fieldsValues._id}`,
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      onSubmit(); // Call the onSubmit callback to refresh the data or handle success
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error updating place:", error);
      alert("Failed to update place.");
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "open" : ""}`}
      ref={modalRef}
      onClick={() => onClose()}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <h2>Edit Place</h2>
        <form onSubmit={handleSubmit}>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <label>Location:</label>
          <input
            type="text"
            name="name"
            placeholder="Location Name"
            value={formData.location?.name ?? ""}
            onChange={handleLocationChange}
          />
          <input
            type="text"
            name="coordinates"
            placeholder="Latitude, Longitude"
            value={formData.location?.coordinates.join(",") ?? ""}
            onChange={(e) =>
              handleLocationChange({
                target: {
                  name: "coordinates",
                  value: e.target.value.split(","),
                },
              })
            }
          />
          <label>Opening Hours:</label>
          <input
            type="text"
            name="openingHours"
            value={formData.openingHours ?? ""}
            onChange={handleChange}
          />
          <label>Closing Hours:</label>
          <input
            type="text"
            name="closingHours"
            value={formData.closingHours ?? ""}
            onChange={handleChange}
          />
          <label>Ticket Prices:</label>
          <input
            type="number"
            name="Native"
            placeholder="Native Price"
            value={formData.ticketPrice?.Native ?? ""}
            onChange={(e) => handleTicketChange("Native", e)}
          />
          <input
            type="number"
            name="Foreigner"
            placeholder="Foreigner Price"
            value={formData.ticketPrice?.Foreigner ?? ""}
            onChange={(e) => handleTicketChange("Foreigner", e)}
          />
          <input
            type="number"
            name="Student"
            placeholder="Student Price"
            value={formData.ticketPrice?.Student ?? ""}
            onChange={(e) => handleTicketChange("Student", e)}
          />
          <label>Tags:</label>
          <div>
            {tags.map((tag) => (
              <label key={tag._id}>
                <input
                  type="checkbox"
                  checked={formData.tagPlace.includes(tag._id)}
                  onChange={() => handleTagPlaceChange(tag._id)}
                />
                {tag.name}
              </label>
            ))}
          </div>
          <label>Images:</label>
          <input type="file" multiple onChange={handleImageChange} />
          <div>
            {imagePreviews.map((preview, index) => (
              <img key={index} src={preview} alt="Image Preview" />
            ))}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EditPlaceModal;
