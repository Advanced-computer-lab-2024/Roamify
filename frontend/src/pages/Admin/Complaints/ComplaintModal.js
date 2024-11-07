import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const ComplaintModal = ({ isOpen, onClose, description }) => {
  const modalRef = useRef(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = () => {
    console.log("Reply:", reply);
    setReply(""); // Clear the reply input after submission
    onClose();
  };

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 50,
      }}
    >
      <div
        ref={modalRef}
        style={{
          width: "600px",
          height: "400px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "24px",
            color: "#4A5568",
            cursor: "pointer",
            background: "none",
            border: "none",
          }}
          aria-label="Close Modal"
        >
          &times;
        </button>

        <h3>Complaint Description</h3>

        <div
          style={{
            flex: "1",
            marginTop: "10px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            overflowY: "auto",
          }}
        >
          <p>{description}</p>
        </div>

        <div style={{ display: "flex", marginTop: "2vh" }}>
          <input
            type="text"
            value={reply}
            onChange={handleReplyChange}
            placeholder="Write a reply..."
            style={{
              flex: "1",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginRight: "10px",
            }}
          />
          <button
            onClick={handleReplySubmit}
            style={{
              padding: "10px 15px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Reply
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ComplaintModal;
