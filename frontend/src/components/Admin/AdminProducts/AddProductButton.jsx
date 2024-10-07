import React, { useState } from "react";
import CreateProductModal from "./CreateProductModal";
import axios from "axios";

const AddProductButton = ({ onCreate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle when Add Product button is clicked
  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={handleAddClick} className="add-product-button">
        Add Product
      </button>
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        // onCreate={(newProduct) => {
        //   onCreate(newProduct); // Call the create function when the form is submitted
        //   handleCloseModal(); // Close the modal after creating the product
        // }}
      />
    </>
  );
};

export default AddProductButton;
