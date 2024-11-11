import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import CreateActivityModal from "./CreateActivityModal";

const UpdateActivityButton = ({ activity, fetchActivities }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleUpdate = async (updatedData) => {
    try {
      await axios.put(
        `http://localhost:3000/api/advertiser/update-activity/${activity._id}`,
        updatedData,
        { withCredentials: true }
      );
      toast.success("Activity updated successfully!");
      fetchActivities(); // Refresh activities list
      handleCloseModal();
    } catch (error) {
      console.error("Error updating activity:", error);
      toast.error("Failed to update activity.");
    }
  };

  return (
    <>
      <button onClick={handleOpenModal} className="btn btn_theme btn_sm">
        Edit
      </button>
      <CreateActivityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleUpdate}
        initialData={activity}
      />
    </>
  );
};

export default UpdateActivityButton;
