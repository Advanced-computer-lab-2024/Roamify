import React, { useState } from "react";
import DeleteModal from "../../Modals/DeleteModal";
import DeleteIcon from "../../Icons/DeleteIcon";
import axios from "axios";

const DeleteCategoryButton = ({ categoryId, type }) => {
  const handleDelete = async () => {
    console.log(categoryId);
    try {
      // Make a DELETE request to the backend API
      const response = await axios.delete(
        `http://localhost:3000/admin/delete-${type}/${categoryId}`
      );

      console.log("Category deleted successfully:", response.data);

      handleCloseModal();
    } catch (error) {
      console.error("Error deleting category:", error.toString());
    }
  };

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

export default DeleteCategoryButton;
