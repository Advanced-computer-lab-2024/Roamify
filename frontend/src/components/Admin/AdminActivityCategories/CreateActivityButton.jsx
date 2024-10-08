import React, { useState } from "react";
import CreateUserModal from "../../Modals/CreateUserModal";
import DynamicCreateModal from "../../Modals/DynamicCreateModal";
import axios from "axios";

const CreateActivityButton = ({ type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createCategory = (formData) => {
    const data = {
      ...formData,
    };

    axios
      .post(`http://localhost:3000/admin/create-${type}`, data)
      .then((result) => {
        // Pass the created user data back
        handleCloseModal();
        if (res) console.log("Signup Data Sent:", result.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          const errorMessage = err.response.data.message;
          if (errorMessage === "Email already exists") {
            alert("Error: Email already exists. Please use a different email.");
          } else if (errorMessage === "Username already Exists") {
            alert(
              "Error: Username already exists. Please choose a different username."
            );
          } else {
            alert(`Error: ${errorMessage}`);
          }
        }
      });
  };

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
        Create
      </button>
      <DynamicCreateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        fields={[
          { name: "name", type: "text" },
          { name: "description", type: "text" },
        ]}
        onSubmit={createCategory}
      />
    </>
  );
};

export default CreateActivityButton;
