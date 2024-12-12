import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const CreateActivityModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    price: "",
    locationName: "",
    locationCoordinates: "",
    preferenceTags: [],
    discounts: "",
    bookingAvailable: false,
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [tagsOptions, setTagsOptions] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/category/get-all"
        );
        setCategoriesOptions(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (isOpen) {
      fetchTags();
      fetchCategories();
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        date: formatDate(initialData.date),
        time: initialData.time || "",
        price: initialData.price || "",
        locationName: initialData.location?.name || "",
        locationCoordinates: initialData.location?.coordinates?.join(",") || "",
        preferenceTags: initialData.preferenceTags || [],
        discounts: initialData.discounts || "",
        bookingAvailable: initialData.bookingAvailable || false,
      });
      setSelectedCategory(initialData.category?._id || "");
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddTag = () => {
    if (selectedTag && !formData.preferenceTags.includes(selectedTag)) {
      setFormData((prev) => ({
        ...prev,
        preferenceTags: [...prev.preferenceTags, selectedTag],
      }));
      setSelectedTag("");
    }
  };

  const handleRemoveTag = (tagId) => {
    setFormData((prev) => ({
      ...prev,
      preferenceTags: prev.preferenceTags.filter((id) => id !== tagId),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const [lat, lng] = formData.locationCoordinates.split(",").map(Number);
    let activityData;
    if (initialData != null) {
      activityData = {
        name: formData.name,
        date: formData.date,
        time: formData.time,
        price: Number(formData.price),
        location:
          initialData != null
            ? {
                type: "Point",
                name: formData.locationName,
                coordinates: [lat, lng],
              }
            : {
                name: formData.locationName,
                coordinates: [lat, lng],
              },
        category: selectedCategory,
        tags: formData.preferenceTags,
        discounts: Number(formData.discounts),
        bookingAvailable: formData.bookingAvailable,
      };
    } else {
      activityData = {
        name: formData.name,
        date: formData.date,
        time: formData.time,
        price: Number(formData.price),
        location:
          initialData != null
            ? {
                type: "Point",
                name: formData.locationName,
                coordinates: [lat, lng],
              }
            : {
                name: formData.locationName,
                coordinates: [lat, lng],
              },
        category: selectedCategory,
        preferenceTags: formData.preferenceTags,
        discounts: Number(formData.discounts),
        bookingAvailable: formData.bookingAvailable,
      };
    }

    console.log(activityData); // for debugging purposes
    onSubmit(activityData);
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
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2
          style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "10px" }}
        >
          {initialData ? "Update Activity" : "Create Activity"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Regular Fields */}
          {[
            { label: "Activity Name", name: "name" },
            { label: "Date", name: "date", type: "date" },
            { label: "Time", name: "time", type: "time" },
            { label: "Price (EGP)", name: "price", type: "number" },
            { label: "Location Name", name: "locationName" },
            {
              label: "Location Coordinates (lat,lng)",
              name: "locationCoordinates",
            },
          ].map((field, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <label
                htmlFor={field.name}
                style={{ display: "block", color: "#4A5568" }}
              >
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "4px 8px",
                  border: "1px solid #D2D6DC",
                  borderRadius: "4px",
                  outline: "none",
                }}
              />
            </div>
          ))}

          {/* Category Selection */}
          <div style={{ marginBottom: "10px" }}>
            <label
              htmlFor="categoryName"
              style={{ display: "block", color: "#4A5568" }}
            >
              Category
            </label>
            <select
              id="categoryName"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: "100%",
                padding: "4px 8px",
                border: "1px solid #D2D6DC",
                borderRadius: "4px",
                outline: "none",
              }}
            >
              <option value="">
                {initialData && initialData.category
                  ? initialData.category.name
                  : "Select a category"}
              </option>
              {categoriesOptions.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags Selection */}
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", color: "#4A5568" }}>Tags</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                style={{
                  width: "100%",
                  padding: "4px 8px",
                  border: "1px solid #D2D6DC",
                  borderRadius: "4px",
                  outline: "none",
                }}
              >
                <option value="">Select a tag</option>
                {tagsOptions.map((tag) => (
                  <option key={tag._id} value={tag._id}>
                    {tag.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddTag}
                style={{
                  padding: "4px 8px",
                  backgroundColor: "var(--main-color)",
                  color: "#fff",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                +
              </button>
            </div>
            <div style={{ marginTop: "10px" }}>
              {formData.preferenceTags.map((tagId) => {
                const tag = tagsOptions.find((tag) => tag._id === tagId);
                return tag ? (
                  <span
                    key={tag._id}
                    style={{
                      marginRight: "8px",
                      color: "#2B6CB0",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    {tag.name}{" "}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag._id)}
                      style={{
                        marginLeft: "4px",
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#e53e3e",
                        cursor: "pointer",
                        fontSize: "1rem",
                      }}
                    >
                      &minus;
                    </button>
                  </span>
                ) : null;
              })}
            </div>
          </div>

          {/* Discounts and Booking Available */}
          <div style={{ marginBottom: "10px" }}>
            <label
              htmlFor="discounts"
              style={{ display: "block", color: "#4A5568" }}
            >
              Discounts (%)
            </label>
            <input
              type="number"
              id="discounts"
              name="discounts"
              value={formData.discounts}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "4px 8px",
                border: "1px solid #D2D6DC",
                borderRadius: "4px",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", color: "#4A5568" }}>
              Booking Available
            </label>
            <input
              type="checkbox"
              name="bookingAvailable"
              checked={formData.bookingAvailable}
              onChange={handleChange}
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
                backgroundColor: "var(--main-color)",
                color: "white",
              }}
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateActivityModal;
