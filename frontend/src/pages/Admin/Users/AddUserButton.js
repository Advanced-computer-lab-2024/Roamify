import React, { useState } from "react";
import AddUserModal from "../../../component/Modals/AddUserModal";
import { toKebabCase } from "../../../functions/toKebabCase";

const AddUserButton = ({ userType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(toKebabCase(userType));

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleAddClick}
        style={{
          padding: "16px",
          backgroundColor: "#3B82F6", // Use your desired accent color
          color: "#FFFFFF",
          border: "none",
          borderRadius: "10px",
          marginLeft: "auto",
          cursor: "pointer",
        }}
      >
        Add {userType}
      </button>
      <AddUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        newUserType={`add-${toKebabCase(userType)}`}
      />
    </>
  );
};

export default AddUserButton;
