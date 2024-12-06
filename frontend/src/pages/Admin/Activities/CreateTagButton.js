import React, { useState } from "react";
import axios from "axios";
import DynamicEditModal from "../../../component/Modals/DynamicEditModal";

const CreateTagButton = ({ type, onCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", description: "" }); // Reset form data on close
  };

  const handleSubmit = (data) => {
    axios
      .post(`http://localhost:3000/api/admin/create-${type}`, data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Category created:", response.data);
        handleCloseModal(); // Close modal on success
        onCreated();
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Failed to create category";
        alert(errorMessage);
      });
  };

  return (
    <>
      <button
        onClick={handleAddClick}
        style={{
          padding: "16px",
          backgroundColor: "var(--main-color)", // Original color
          color: "#FFFFFF",
          border: "none",
          borderRadius: "10px",
          marginLeft: "auto",
          cursor: "pointer",
          transition: "background-color 0.3s ease", // Smooth transition
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--main-color-hover)")
        } // Darker shade on hover
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--main-color)")
        } // Revert back to original color
      >
        <i className="fas fa-plus" style={{ marginRight: "8px" }}></i>
        Create
      </button>

      <DynamicEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        fields={[
          { name: "name", value: formData.name, type: "text" },
          { name: "description", value: formData.description, type: "text" },
        ]}
        onSubmit={(data) => handleSubmit(data)} // Pass the form data to handleSubmit
      />
    </>
  );
};

export default CreateTagButton;
