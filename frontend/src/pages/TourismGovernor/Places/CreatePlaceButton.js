import React, { useState } from "react";
import axios from "axios";
import EditIcon from "../../../component/Icons/EditIcon";
import DynamicEditModal from "../../../component/Modals/DynamicEditModal";
import EditPlaceModal from "../../../component/Modals/EditPlaceModal";

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

      <EditPlaceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        fieldsValues={{}}
      />
    </>
  );
};

export default CreatePlaceButton;
