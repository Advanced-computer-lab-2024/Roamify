import React from "react";
import { toast } from "react-toastify";
import { FaCopy, FaEnvelope, FaTimes } from "react-icons/fa";

const ShareModal = ({ isOpen, onClose, handleCopy, handleShareEmail }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        className="share-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          background: "var(--secondary-color)",
          border: "1px solid var(--secondary-border-color)",
          padding: "20px",
          borderRadius: "15px",
          flexDirection: "column",
          height: "30vh",
          width: "30%",
        }}
      >
        <div style={{ display: "flex" }}>
          <h2 style={{ color: "var(--text-color)" }}>Share Itinerary</h2>
          <button
            onClick={onClose}
            style={{
              marginLeft: "auto",
              color: "var(--text-color)",
              background: "transparent",
            }}
          >
            <FaTimes size={16} /> {/* The icon */}
          </button>
        </div>

        <div
          className="modal-body"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <button onClick={handleCopy} className="cancel-button">
            <FaCopy style={{ marginRight: "8px" }} /> Copy Link
          </button>
          <button onClick={handleShareEmail}>
            <FaEnvelope style={{ marginRight: "8px" }} /> Share via Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
