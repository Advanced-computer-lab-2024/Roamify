// DeleteModal.jsx
import React, { useEffect } from "react";
import Modal from "react-modal";

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  useEffect(() => {
    if (isOpen) {
      // Add a class to the body to disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Remove the class from the body to enable scrolling
      document.body.style.overflow = "auto";
    }

    // Cleanup when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Confirmation"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "400px",
          margin: "auto",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
        },
      }}
    >
      <h2>Are you sure you want to delete?</h2>
      <p>This action cannot be undone.</p>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Confirm Delete
        </button>
        <button
          onClick={onClose}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ccc",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
