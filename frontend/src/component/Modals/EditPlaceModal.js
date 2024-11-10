import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const EditPlaceModal = ({ isOpen, onClose, fieldsValues, onSubmit }) => {
  const modalRef = useRef(null);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/preference-tag/get-all"
        );
        setTags(res.data.tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  const [formData, setFormData] = useState({
    placeImages: fieldsValues.placeImages || [],
    description: fieldsValues.description || "",
    closingHours: fieldsValues.closingHours || "",
    openingHours: fieldsValues.openingHours || "",
    tagPlace: fieldsValues.tagPlace || "",
    ticketPrice: {
      native: fieldsValues.ticketPrice?.native || "",
      foreigner: fieldsValues.ticketPrice?.foreigner || "",
      student: fieldsValues.ticketPrice?.student || "",
    },
  });

  useEffect(() => {
    setFormData(fieldsValues);
  }, [fieldsValues]);

  const [imagePreviews, setImagePreviews] = useState(
    fieldsValues.placeImages?.map((img) => URL.createObjectURL(img)) || []
  );

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      placeImages: [...prev.placeImages, ...files],
    }));
    setImagePreviews((prev) => [...prev, ...filePreviews]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTicketPriceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      ticketPrice: { ...prev.ticketPrice, [name]: value },
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
          {fieldsValues.description ? "Edit Place" : "Create Place"}
        </h2>
        <form onSubmit={handleSubmit}>
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

          <div style={{ marginBottom: "10px" }}>
            <label>Tag Place</label>
            <select
              name="tagPlace"
              value={formData.tagPlace}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "4px 8px",
                border: "1px solid #D2D6DC",
                borderRadius: "4px",
              }}
            >
              {tags.map((tag, index) => (
                <option key={index} value={tag._id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Ticket Price</label>
            <div>
              <label>Native</label>
              <input
                type="number"
                name="native"
                value={formData.ticketPrice.native}
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
                name="foreigner"
                value={formData.ticketPrice.foreigner}
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
                name="student"
                value={formData.ticketPrice.student}
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
