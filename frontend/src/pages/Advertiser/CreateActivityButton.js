import React, { useState } from "react";
import axios from "axios";
import EditIcon from "../../component/Icons/EditIcon";
import DynamicEditModal from "../../component/Modals/DynamicEditModal";
import CreateActivityModal from "./CreateActivityModal";

const CreateActivityButton = ({ reFetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = (formData) => {
    axios
      .post("http://localhost:3000/api/advertiser/create-activity", formData, {
        withCredentials: true,
      })
      .then((result) => {
        console.log("Activity created:", result.data);
        reFetch();
        handleCloseModal();

        // Show success toast or message here if needed
      })
      .catch((err) => {
        const errorMessage =
          err.response && err.response.data.message
            ? err.response.data.message
            : "Failed to create activity";
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
          backgroundColor: "var(--main-color)",
          color: "#fff",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        <EditIcon /> Create Activity
      </button>

      <CreateActivityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        // Customize fields as required by the API payload
      />
    </>
  );
};

export default CreateActivityButton;
