import React from "react";
import { toast } from "react-toastify";
import { FaCopy, FaEnvelope, FaTimes } from "react-icons/fa";

const ShareModal = ({ isOpen, onClose, handleCopy, handleShareEmail }) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal"
      style={{
        display: "flex",
        position: "fixed",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
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
          <h2>Share Itinerary</h2>
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
