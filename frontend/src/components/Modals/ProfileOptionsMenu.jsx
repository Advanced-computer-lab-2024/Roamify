import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import CreateUserModal from "./CreateUserModal";

const ProfileOptionsMenu = ({ isOpen, onClose }) => {
  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (e.key === "Escape") {
  //       onClose();
  //     }
  //   };
  //   if (isOpen) {
  //     window.addEventListener("keydown", handleKeyDown);
  //   }
  //   return () => window.removeEventListener("keydown", handleKeyDown);
  // }, [isOpen, onClose]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    // Logic for logout
    console.log("Logged out");
    onClose(); // Close the menu after action
  };

  const handleAddAccount = () => {
    setIsModalOpen(true);
    console.log("Add Admin");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".profile-menu")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    isOpen && (
      <div className="absolute top-[-40%] right-[10%] mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
        <div className="absolute top-[105%] right-[42%] w-0 h-0 border-l-[15px] border-r-[15px] border-t-[15px] shadow-md border-t-white border-l-transparent border-r-transparent transform -translate-y-1" />
        <ul className="py-1">
          <li>
            <button
              onClick={handleAddAccount}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Add Account
            </button>
            <CreateUserModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onCreate={() => {}}
            />
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    )
  );
};

export default ProfileOptionsMenu;
