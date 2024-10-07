import React, { useState } from "react";
import EditIcon from "../../Icons/EditIcon";
import DynamicEditModal from "../../Modals/DynamicEditModal";
import axios from "axios";

export const EditProductButton = ({ productId, description, price }) => {
  const editProduct = (formData) => {
    // console.log(categoryId);
    const data = {
      ...formData,
    };

    axios
      .put(`http://localhost:3000/product/edit-product/${productId}`, data)
      .then((result) => {
        // Pass the created user data back
        handleCloseModal();
        if (res) console.log("edit Data Sent:", result.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          const errorMessage = err.response.data.message;
          alert(errorMessage);
        }
      });
  };
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
        className="ml-auto p-4 text-white rounded-full hover:bg-secondaryHover"
      >
        <EditIcon />
      </button>

      <DynamicEditModal
        isOpen={isModalOpen}
        fields={[
          { name: "description", value: description, type: "text" },
          { name: "price", value: price, type: "number" },
        ]}
        onClose={handleCloseModal}
        onSubmit={editProduct}
      />
    </>
  );
};

export default EditProductButton;
