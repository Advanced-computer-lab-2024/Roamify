import React, { useState } from "react";
import AddUserModal from "../../../component/Modals/AddUserModal";

const AddUserButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        Add Tourism Governor
      </button>
      <AddUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        newUserType={"add-tourism-governor"}
      />
    </>
  );
};

export default AddUserButton;
