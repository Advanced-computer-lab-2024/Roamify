import React, { useState } from "react";
import axios from "axios";
import DynamicEditModal from "../../component/Modals/DynamicEditModal"; // Make sure this component exists
import Promo from "../../component/Promo";

const CreatePromoCodeButton = ({ onCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discountPercentage: "",
    expiryDate: "",
    usesLeft: "",
  });

  // Open the modal
  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  // Close the modal and reset form data
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      code: "",
      discountPercentage: "",
      expiryDate: "",
      usesLeft: "",
    });
  };

  // Handle form submission
  const handleSubmit = (data) => {
    axios
      .post("http://localhost:3000/api/promocode/", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Promo code created:", response.data);
        handleCloseModal(); // Close the modal on success
        onCreated(); // Call onCreated callback to update UI or state
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Failed to create promo code";
        alert(errorMessage);
      });
  };

  return (
    <>
      <button
        onClick={handleAddClick}
        style={{
          backgroundColor: "transparent", // Original color
          cursor: "pointer",
          transition: "background-color 0.3s ease", // Smooth transition
        }}
      >
        <Promo size="20px" />
      </button>

      {/* Dynamic modal for creating promo code */}
      <DynamicEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        fields={[
          {
            name: "code",
            value: formData.code,
            type: "text",
            label: "Promo Code",
          },
          {
            name: "discountPercentage",
            value: formData.discountPercentage,
            type: "number",
            label: "Discount Percentage",
          },
          {
            name: "expiryDate",
            value: formData.expiryDate,
            type: "date",
            label: "Expiry Date",
          },
          {
            name: "usesLeft",
            value: formData.usesLeft,
            type: "number",
            label: "Uses Left",
          },
        ]}
        onSubmit={(data) => handleSubmit(data)} // Pass the form data to handleSubmit
      />
    </>
  );
};

export default CreatePromoCodeButton;
