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
          height: "40vh",
          width: "400px",
          margin: "auto",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--secondary-color)",
          border: "none",
        },
      }}
    >
      {/* Close Button (Top Right) */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          color: "#666",
        }}
      >
        &times;
      </button>

      {/* X Icon with Circular Border (Top Left) */}
      <div
        style={{
          height: "70px",
          width: "70px",
          borderRadius: "50%",
          border: "1px solid var(--main-color)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "var(--main-color)",
          fontSize: "3rem",
          cursor: "pointer",
          marginBottom: "2vh",
        }}
        onClick={onClose}
      >
        &times;
      </div>

      {/* Modal Content */}
      <h2 style={{ fontSize: "1.5rem", color: "var(--text-color)" }}>
        Are you sure?
      </h2>
      <p style={{ fontSize: "1rem", color: "var(--dashboard-title-color)" }}>
        This action cannot be undone.
      </p>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={onClose}
          style={{
            padding: "10px 20px",
            backgroundColor: "var(--gray-color)",
            marginRight: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          style={{
            padding: "10px 10px",
            backgroundColor: "var(--main-color)",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Confirm Delete
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
