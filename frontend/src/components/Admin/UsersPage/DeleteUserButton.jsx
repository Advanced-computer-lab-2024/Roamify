import React, { useState } from "react";
import DeleteModal from "../../Modals/DeleteModal";
import DeleteIcon from "../../Icons/DeleteIcon";
import axios from "axios";

const DeleteUserButton = ({ userId }) => {
  const handleDelete = async () => {
    try {
      // Make a DELETE request to the backend API
      console.log(userId);
      const response = await axios.delete(
        `http://localhost:3000/admin/delete-account/${userId}`
      );

      console.log("User deleted successfully:", response.data);

      handleCloseModal();
    } catch (error) {
      console.error("Error deleting user:", error.toString());
    }
  };

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
        className="ml-auto p-4 text-white rounded-full hover:bg-secondaryHover"
      >
        <DeleteIcon />
      </button>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default DeleteUserButton;
