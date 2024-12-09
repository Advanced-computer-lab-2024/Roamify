import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const EditPlaceModal = ({ isOpen, onClose, fieldsValues, onSubmit }) => {
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    description: "",
    closingHours: "",
    openingHours: "",
    placeImages: [],
    location: { type: "Point", coordinates: [], name: "" },
    tagPlace: [],
    ticketPrice: { Native: "", Foreigner: "", Student: "" },
  });

  const [tagsOptions, setTagsOptions] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/preference-tag/get-all"
        );
        setTagsOptions(response.data.tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    if (isOpen) {
      fetchTags();
      setFormData({
        description: fieldsValues?.description || "",
        closingHours: fieldsValues?.closingHours || "",
        openingHours: fieldsValues?.openingHours || "",
        placeImages: fieldsValues?.placeImages || [],
        location: fieldsValues?.location || {
          type: "Point",
          coordinates: [],
          name: "",
        },
        tagPlace: fieldsValues?.tagPlace || [],
        ticketPrice: fieldsValues?.ticketPrice || {
          Native: "",
          Foreigner: "",
          Student: "",
        },
      });
    }
  }, [isOpen, fieldsValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: name === "coordinates" ? value.split(",").map(Number) : value,
      },
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      placeImages: [...prev.placeImages, ...files],
    }));
  };

  const handleTicketPriceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      ticketPrice: {
        ...prev.ticketPrice,
        [name]: value,
      },
    }));
  };

  const handleTagChange = (tagId) => {
    setFormData((prev) => {
      const tagPlace = prev.tagPlace.includes(tagId)
        ? prev.tagPlace.filter((id) => id !== tagId)
        : [...prev.tagPlace, tagId];
      return { ...prev, tagPlace };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    for (let key in formData) {
      if (key === "placeImages" && Array.isArray(formData[key])) {
        formData[key].forEach((file) => data.append("placeImages", file));
      } else if (key === "location") {
        data.append(key, JSON.stringify(formData[key]));
      } else if (key === "ticketPrice" || key === "tagPlace") {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    }

    onSubmit(data);
  };

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
          backgroundColor: "var(--secondary-color)",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "90%",
          maxWidth: "600px",
          maxHeight: "70vh",
          overflowY: "auto",
        }}
      >
        <h2
          style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "10px" }}
        >
          Edit Place
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Description */}
          <div style={{ marginBottom: "10px" }}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "4px 8px",
                border: "1px solid #D2D6DC",
                borderRadius: "4px",
              }}
            />
          </div>

          {/* Closing Hours */}
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

          {/* Location */}
          <div style={{ marginBottom: "10px" }}>
            <label>Location Name</label>
            <input
              type="text"
              name="name"
              value={formData.location.name}
              onChange={handleLocationChange}
              style={{
                width: "100%",
                padding: "4px 8px",
                border: "1px solid #D2D6DC",
                borderRadius: "4px",
              }}
            />
            <label>Coordinates (lat,lng)</label>
            <input
              type="text"
              name="coordinates"
              value={formData.location.coordinates.join(",")}
              onChange={handleLocationChange}
              style={{
                width: "100%",
                padding: "4px 8px",
                border: "1px solid #D2D6DC",
                borderRadius: "4px",
              }}
            />
          </div>

          {/* Tag Place */}
          <div style={{ marginBottom: "10px" }}>
            <label>Tags</label>
            <div>
              {tagsOptions.map((tag) => (
                <div key={tag._id} style={{ marginBottom: "5px" }}>
                  <input
                    type="checkbox"
                    checked={formData.tagPlace.includes(tag._id)}
                    onChange={() => handleTagChange(tag._id)}
                  />
                  <label style={{ marginLeft: "8px" }}>{tag.name}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Ticket Price */}
          <div style={{ marginBottom: "10px" }}>
            <label>Ticket Price</label>
            <div>
              <label>Native</label>
              <input
                type="number"
                name="Native"
                value={formData.ticketPrice.Native}
                onChange={handleTicketPriceChange}
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
                value={formData.ticketPrice.Foreigner}
                onChange={handleTicketPriceChange}
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
                value={formData.ticketPrice.Student}
                onChange={handleTicketPriceChange}
                style={{
                  width: "100%",
                  padding: "4px 8px",
                  border: "1px solid #D2D6DC",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>

          {/* Place Images */}
          <div style={{ marginBottom: "10px" }}>
            <label>Place Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>

          {/* Submit and Cancel buttons */}
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
