import React, { useState } from "react";
import EditIcon from "../../../component/Icons/EditIcon";
import DynamicEditModal from "../../../component/Modals/DynamicEditModal";
import CreateProductModal from "../../../component/Modals/CreateProductModal";
import axios from "axios";

const AddProductButton = ({
  itemId,
  img,
  name,
  price,
  quantity,
  description,
}) => {
  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/product/add-product/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      // Handle the successful response
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
        style={{
          marginLeft: "auto",
          padding: "1rem",
          width: "100%",
          backgroundColor: "var(--main-color)", // Assuming this is the secondary color
          color: "white",
          borderRadius: "4px", // Full round button
          cursor: "pointer",
          transition: "background-color 0.3s",
          border: "1px solid #cfcdcd",
        }}
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "var(--main-color)")
        }
      >
        Add Product
      </button>

      <CreateProductModal
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

export default AddProductButton;
