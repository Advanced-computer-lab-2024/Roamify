import React, { useState } from "react";
import EditIcon from "../../../component/Icons/EditIcon";
import DynamicEditModal from "../../../component/Modals/DynamicEditModal";
import axios from "axios";

const EditProductButton = ({
  itemId,
  img,
  name,
  price,
  quantity,
  description,
  fetchProducts,
}) => {
  const handleSubmit = async (formData) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/product/edit-product/${itemId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      // Handle the successful response
      handleCloseModal();
      fetchProducts();
      console.log("Product updated successfully:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error updating product:", error);
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
        className="cancel-button"
        style={{
          flex: 1,
          display: "flex",
          height: "7vh",
          alignItems: "center",
          justifyContent: "space-evenly",
          color: "var(--text-color)",
          borderRadius: "5px", // Full round button
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
      >
        <EditIcon fill="var(--text-color)" /> Edit
      </button>

      <DynamicEditModal
        isOpen={isModalOpen}
        fields={[
          { name: "name", value: name, type: "text" },
          { name: "price", value: price, type: "number" },
          { name: "quantity", value: quantity, type: "number" },
          { name: "description", value: description, type: "text" },
          { name: "productImages", value: img, type: "img", img: img },
        ]}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        img={img}
      />
    </>
  );
};

export default EditProductButton;
