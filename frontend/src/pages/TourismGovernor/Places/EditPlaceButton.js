import React, { useState } from "react";
import EditIcon from "../../../component/Icons/EditIcon";
import DynamicEditModal from "../../../component/Modals/DynamicEditModal";
import axios from "axios";
import EditPlaceModal from "../../../component/Modals/EditPlaceModal";

const EditPlaceButton = ({
  itemId,
  description,
  placeImages,
  closingHours,
  openingHours,
  tagPlace,
  ticketPrice,
}) => {
  const handleSubmit = (formData) => {
    // console.log(categoryId);
    const data = {
      ...formData,
    };

    axios
      .put(
        `http://localhost:3000/api/tourismgovernor/update-place/${itemId}`,
        data,
        {
          withCredentials: true,
        }
      )
      .then((result) => {
        // Pass the created user data back
        handleCloseModal();
        if (result) console.log("edit Data Sent:", result.data);
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
        style={{
          marginLeft: "auto",
          padding: "1rem",
          backgroundColor: "transparent", // Assuming this is the secondary color
          color: "white",
          borderRadius: "9999px", // Full round button
          cursor: "pointer",
          transition: "background-color 0.3s",
          border: "1px solid #cfcdcd",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#eceaea")} // Hover color
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        <EditIcon />
      </button>

      <EditPlaceModal
        isOpen={isModalOpen}
        fieldsValues={{
          description: description,
          placeImages: placeImages,
          closingHours: closingHours,
          openingHours: openingHours,
          tagPlace: tagPlace,
          ticketPrice: ticketPrice,
        }}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default EditPlaceButton;
