import { useEffect } from "react";
import React from "react";
import ReactDOM from "react-dom";
import CreateUserSignUpForm from "../Admin/AdminTourismGoverner/CreateGovernorSignUpForm";
const CreateUserModal = ({ isOpen, onClose, newUserType }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative">
        <button
          onClick={() => {
            console.log("Close button clicked");
            onClose();
          }}
          className="absolute text-2xl top-1 right-2 text-gray-600 hover:text-gray-800"
          aria-label="Close Modal"
        >
          &times;
        </button>
        <CreateUserSignUpForm onClose={onClose} newUserType={newUserType} />
      </div>
    </div>,
    document.body
  );
};

export default CreateUserModal;
