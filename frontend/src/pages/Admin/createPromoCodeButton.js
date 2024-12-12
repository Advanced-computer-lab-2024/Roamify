import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      code: "",
      discountPercentage: "",
      expiryDate: "",
      usesLeft: "",
    });
  };

    const handleSubmit = (data) => {
        axios
            .post("http://localhost:3000/api/promocode/", data, {
                withCredentials: true,
            })
            .then((response) => {
                console.log("API response:", response);
                try {
                    const promoCode = response.data.promoCode?.code || "Unknown";
                    toast.success(`Promo code created: ${promoCode}`);
                    handleCloseModal(); // Ensure this function is correctly implemented
                    onCreated(); // Ensure this is correctly updating the UI
                } catch (error) {

                }
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "Failed to create promo code";
                toast.error(errorMessage);
            });
    };



    return (
    <>
      <button
        onClick={handleAddClick}
        style={{
          backgroundColor: "transparent",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        <Promo size="20px" />
      </button>

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
        onSubmit={handleSubmit}
      />

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default CreatePromoCodeButton;
