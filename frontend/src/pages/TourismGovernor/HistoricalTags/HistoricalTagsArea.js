import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const HistoricalTagsArea = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/tourismgovernor/create-historical-tag",
        formData,
        {
          withCredentials: true,
        }
      );

      toast.success("Historical tag created successfully!");
      setFormData({ name: "", description: "" }); // Clear form fields
    } catch (error) {
      toast.error("Error creating historical tag.");
      console.error("Error:", error);
    }
  };

  return (
    <section
      className="section_padding"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="container">
        <Toaster position="bottom-center" reverseOrder={false} />
        <h2 className="section-heading" style={{ marginBottom: "20vh" }}>
          Create a Historical Tag
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "500px", margin: "auto", flex: 1 }}
        >
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="name"
              style={{
                display: "block",
                color: "var(--text-color)",
                marginBottom: "5px",
              }}
            >
              Tag Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: "100%",
                borderRadius: "4px",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="description"
              style={{
                display: "block",
                color: "var(--text-color)",
                marginBottom: "5px",
              }}
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{
                width: "100%",
                borderRadius: "4px",
                outline: "none",
                background: "var(--background-color)",
                resize: "none",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "var(--main-color)",
              color: "white",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Create Tag
          </button>
        </form>
      </div>
    </section>
  );
};

export default HistoricalTagsArea;
