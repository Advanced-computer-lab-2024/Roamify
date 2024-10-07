import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import CreateUserModal from "./CreateUserModal";

const ProfileOptionsMenu = ({ isOpen, onClose }) => {
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

  console.log("ProfileOptionsMenu rendering");
  return (
    <>
      {isOpen && (
        <div className="absolute top-[-40%] right-[10%] mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 profile-menu">
          <div className="absolute top-[105%] right-[42%] w-0 h-0 border-l-[15px] border-r-[15px] border-t-[15px] shadow-md border-t-white border-l-transparent border-r-transparent transform -translate-y-1" />
          <ul className="py-1">
            <li>
              <button
                onClick={handleAddAccount}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Add Account
              </button>
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
      )}

      {isModalOpen && (
        <CreateUserModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          newUserType={"add-admin"}
        />
      )}
    </>
  );
};

export default ProfileOptionsMenu;
