import React, { useState } from "react";
import axios from "axios";
import DynamicEditModal from "../../../component/Modals/DynamicEditModal";

const CreateTagButton = ({ type }) => {
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
          backgroundColor: "#3B82F6", // Use your desired accent color
          color: "#FFFFFF",
          border: "none",
          borderRadius: "10px",
          marginLeft: "auto",
          cursor: "pointer",
        }}
      >
        Add {type}
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
