import React, { useState } from "react";
import axios from "axios";
import EditIcon from "../../../component/Icons/EditIcon";
import DynamicEditModal from "../../../component/Modals/DynamicEditModal";

const CreatePlaceButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = (formData) => {
    axios
      .post(
        "http://localhost:3000/api/tourismgovernor/create-place",
        formData,
        {
          withCredentials: true,
        }
      )
      .then((result) => {
        console.log("Place created:", result.data);
        handleCloseModal();
      })
      .catch((err) => {
        const errorMessage =
          err.response && err.response.data.message
            ? err.response.data.message
            : "Failed to create place";
        alert(errorMessage);
      });
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        style={{
          display: "block",
          width: "100%",
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        <EditIcon /> Create Place
      </button>

      {/* Use DynamicEditModal for form fields */}
      <DynamicEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "placeImages", label: "Place Images (URL)", type: "text" },
          { name: "openingHours", label: "Opening Hours", type: "text" },
          { name: "closingHours", label: "Closing Hours", type: "text" },
          { name: "tagPlace", label: "Tag Place", type: "text" },
          { name: "ticketPrice", label: "Ticket Price", type: "number" },
        ]}
      />
    </>
  );
};

export default CreatePlaceButton;
