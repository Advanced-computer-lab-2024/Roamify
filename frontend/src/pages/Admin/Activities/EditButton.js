import React, { useState } from "react";
import EditIcon from "../../../component/Icons/EditIcon";
import DynamicEditModal from "../../../component/Modals/DynamicEditModal";
import axios from "axios";

const EditButton = ({ itemId, name, description, type, reFetch }) => {
  const editCategory = (formData) => {
    // console.log(categoryId);
    const data = {
      ...formData,
    };

    axios
      .put(`http://localhost:3000/api/admin/update-${type}/${itemId}`, data, {
        withCredentials: true,
      })
      .then((result) => {
        // Pass the created user data back
        handleCloseModal();
        reFetch();
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
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor =
            "var(--secondary-hover-color)")
        } // Hover color
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        <EditIcon fill="var(--text-color)" />
      </button>

      <DynamicEditModal
        isOpen={isModalOpen}
        fields={[
          { name: "name", value: name, type: "text" },
          { name: "description", value: description, type: "text" },
        ]}
        onClose={handleCloseModal}
        onSubmit={editCategory}
      />
    </>
  );
};

export default EditButton;
