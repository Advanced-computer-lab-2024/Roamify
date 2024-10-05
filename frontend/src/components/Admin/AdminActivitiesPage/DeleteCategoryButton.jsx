import React, { useState } from "react";
import DeleteModal from "../../Modals/DeleteModal";

const DeleteCategoryButton = ({ categoryName }) => {
  const handleDelete = (categoryName) => {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDeleteClick = (userName) => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button
        onClick={handleDeleteClick}
        className="ml-auto p-4 bg-red-600 text-white rounded-[10px]"
      >
        Delete Category
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
