import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const EditPlaceModal = ({ isOpen, onClose, fieldsValues, onSubmit }) => {
  const modalRef = useRef(null);
  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);

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

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      placesImages: [...prev.placesImages, ...files],
    }));
    setImagePreviews((prev) => [...prev, ...filePreviews]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: { ...prev.location, [name]: value },
    }));
  };

  const handleNativeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      ticketPrice: {
        ...prev.ticketPrice,
        Native: e.target.value,
      },
    }));
  };

  const handleForeignerChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      ticketPrice: {
        ...prev.ticketPrice,
        Foreigner: e.target.value,
      },
    }));
  };

  const handleStudentChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      ticketPrice: {
        ...prev.ticketPrice,
        Student: e.target.value,
      },
    }));
  };

  const handleTagPlaceChange = (tagId) => {
    setFormData((prev) => {
      const tagPlace = prev.tagPlace.includes(tagId)
        ? prev.tagPlace.filter((id) => id !== tagId)
        : [...prev.tagPlace, tagId];
      return { ...prev, tagPlace };
    });
  };

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
    submissionData.append("ticketPrice", JSON.stringify(formData.ticketPrice)); // TicketPrice JSON

    // Ensure tagPlace is an array of strings
    formData.tagPlace.forEach((tagId) =>
      submissionData.append("tagPlace", tagId)
    );

    // Append image files
    formData.placesImages.forEach((file) =>
      submissionData.append("placesImages", file)
    );

    // Log the FormData content
    for (let pair of submissionData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/tourismgovernor/create-place",
        submissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Ensures cookies are sent with the request
        }
      );
      onSubmit(response.data); // Callback with the API response
      onClose(); // Close modal
    } catch (error) {
      console.error("Error creating place:", error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
      }}
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "90%",
          maxWidth: "600px",
          height: "fit-content",
        }}
      >
        <h2
          style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "10px" }}
        >
          {fieldsValues?.description ? "Edit Place" : "Create Place"}
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ height: "80vh", overflowY: "auto" }}
        >
          {/* Place Images */}
          <div style={{ marginBottom: "10px" }}>
            <label>Place Images</label>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1vh" }}
            >
              {imagePreviews.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="Preview"
                  style={{ maxWidth: "100px", marginBottom: "5px" }}
                />
              ))}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Type</label>
            <textarea
              name="type"
              value={formData.type ?? ""}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "4px 8px",
                border: "1px solid #D2D6DC",
                borderRadius: "4px",
              }}
            />
          </div>

          {/* Location Fields */}
          <div style={{ marginBottom: "10px" }}>
            <label>Location</label>
            <input
              type="text"
              name="name"
              value={formData.location.name || ""}
              placeholder="Location Name"
              onChange={handleLocationChange}
              style={{
                width: "100%",
                padding: "4px 8px",
                border: "1px solid #D2D6DC",
                borderRadius: "4px",
              }}
            />
            <input
              type="text"
              name="coordinates"
              value={formData.location.coordinates.join(", ") || ""}
              placeholder="Coordinates (e.g., 10, 20)"
              onChange={(e) =>
                handleLocationChange({
                  target: {
                    name: "coordinates",
                    value: e.target.value.split(",").map(Number),
                  },
                })
              }
              style={{
                width: "100%",
                padding: "4px 8px",
                border: "1px solid #D2D6DC",
                borderRadius: "4px",
              }}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: "10px" }}>
            <label>Name</label>
            <textarea
              name="name"
              value={formData.name ?? ""}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "4px 8px",
                border: "1px solid #D2D6DC",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description ?? ""}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "4px 8px",
                border: "1px solid #D2D6DC",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Closing Hours</label>
            <input
              type="text"
              name="closingHours"
              value={formData.closingHours}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "4px 8px",
                border: "1px solid #D2D6DC",
                borderRadius: "4px",
              }}
            />
          </div>

          {/* Opening Hours */}
          <div style={{ marginBottom: "10px" }}>
            <label>Opening Hours</label>
            <input
              type="text"
              name="openingHours"
              value={formData.openingHours}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "4px 8px",
                border: "1px solid #D2D6DC",
                borderRadius: "4px",
              }}
            />
          </div>

          {/* Ticket Prices */}
          <div style={{ marginBottom: "10px" }}>
            <label>Ticket Price</label>
            <div>
              <label>Native</label>
              <input
                type="number"
                name="Native"
                value={formData.ticketPrice.Native ?? ""}
                onChange={handleNativeChange}
                style={{
                  width: "100%",
                  padding: "4px 8px",
                  border: "1px solid #D2D6DC",
                  borderRadius: "4px",
                }}
              />
              <label>Foreigner</label>
              <input
                type="number"
                name="Foreigner"
                value={formData.ticketPrice.Foreigner ?? ""}
                onChange={handleForeignerChange}
                style={{
                  width: "100%",
                  padding: "4px 8px",
                  border: "1px solid #D2D6DC",
                  borderRadius: "4px",
                }}
              />
              <label>Student</label>
              <input
                type="number"
                name="Student"
                value={formData.ticketPrice.Student ?? ""}
                onChange={handleStudentChange}
                style={{
                  width: "100%",
                  padding: "4px 8px",
                  border: "1px solid #D2D6DC",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>

          {/* Tag Places */}
          <div style={{ marginBottom: "10px" }}>
            <label>Tag Places</label>
            <div>
              {tags.map((tag) => (
                <div key={tag._id} style={{ marginBottom: "5px" }}>
                  <input
                    type="checkbox"
                    checked={formData.tagPlace.includes(tag._id)}
                    onChange={() => handleTagPlaceChange(tag._id)}
                  />
                  <label style={{ marginLeft: "8px" }}>{tag.name}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "16px",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                marginRight: "16px",
                backgroundColor: "#E2E8F0",
                color: "#4A5568",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                backgroundColor: "#2B6CB0",
                color: "white",
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlaceModal;
