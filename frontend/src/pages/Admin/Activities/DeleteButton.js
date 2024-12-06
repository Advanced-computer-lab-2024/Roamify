import React, { useState } from "react";
import DeleteIcon from "../../../component/Icons/DeleteIcon";
import ConfirmModal from "../../../component/Modals/ConfirmModal";
import axios from "axios";

const DeleteButton = ({ handleDelete }) => {
  // const handleDelete = (categoryName) => {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button
        onClick={handleDeleteClick}
        style={{
          marginLeft: "auto",
          padding: "16px",
          color: "white",
          borderRadius: "50%",
          backgroundColor: "transparent",
          transition: "background-color 0.2s",
          cursor: "pointer",
          border: "0px solid #cfcdcd",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "var(--secondary-hover-color)";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "transparent";
        }}
      >
        <DeleteIcon fill="var(--text-color)" />
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default DeleteButton;
