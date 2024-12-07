import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ComplaintModal = ({
  isOpen,
  onClose,
  description,
  isReplied,
  reply,
  complaintId,
}) => {
  const modalRef = useRef(null);
  const [replyText, setReplyText] = useState(reply);

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
    setReplyText(e.target.value);
  };

  const handleReplySubmit = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/complaint/reply/${complaintId}`,
        { message: replyText },
        { withCredentials: true }
      );
      toast.success("Reply sent successfully!");
      onClose(); // Close the modal after successful reply
    } catch (error) {
      toast.error("Error sending reply.");
      console.error("Error sending reply:", error);
    }
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
          backgroundColor: "var(--secondary-color)",
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
            border: "1px solid var(--secondary-border-color)",
            overflowY: "auto",
          }}
        >
          <p>{description}</p>
        </div>

        <div style={{ display: "flex", marginTop: "2vh" }}>
          <input
            type="text"
            value={replyText}
            onChange={handleReplyChange}
            placeholder="Write a reply..."
            disabled={isReplied}
            style={{
              flex: "1",
              padding: "10px",
              borderRadius: "4px",
              marginRight: "10px",
            }}
          />
          <button
            onClick={handleReplySubmit}
            disabled={isReplied}
            style={{
              backgroundColor: isReplied
                ? "var(--gray-color)"
                : "var(--main-color)",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: isReplied ? "not-allowed" : "pointer",
            }}
          >
            Reply
          </button>
        </div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </div>,
    document.body
  );
};

export default ComplaintModal;
