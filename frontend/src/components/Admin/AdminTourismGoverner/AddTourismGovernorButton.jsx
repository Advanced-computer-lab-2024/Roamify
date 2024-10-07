import React, { useState } from "react";
import CreateUserModal from "../../Modals/CreateUserModal";

const AddTourismGovernorButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddClick = (userName) => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button
        onClick={handleAddClick}
        className="p-4 bg-accent text-white border rounded-[10px] ml-auto"
      >
        Add Tourism Governor
      </button>
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        newUserType={"add-tourism-governor"}
      />
    </>
  );
};

export default AddTourismGovernorButton;
