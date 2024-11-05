import { useEffect, useRef } from "react";
import React from "react";
import ReactDOM from "react-dom";
import AddUserForm from "../../pages/Admin/Users/AddUserForm";

const AddUserModal = ({ isOpen, onClose, newUserType }) => {
  const modalRef = useRef(null);

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
      <div ref={modalRef} style={{ position: "relative" }}>
        <button
          onClick={() => {
            console.log("Close button clicked");
            onClose();
          }}
          style={{
            position: "absolute",
            top: "4px",
            right: "8px",
            fontSize: "24px",
            color: "#4A5568",
            cursor: "pointer",
          }}
          aria-label="Close Modal"
        >
          &times;
        </button>
        <AddUserForm onClose={onClose} newUserType={newUserType} />
      </div>
    </div>,
    document.body
  );
};

export default AddUserModal;
