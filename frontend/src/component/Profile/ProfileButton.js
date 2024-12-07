import React, { useState } from "react";
import Modal from "react-modal";
import ProfileIcon from "../Icons/ProfileIcon";
import { useNavigate } from "react-router-dom";
import { FaWallet, FaBookmark, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function ProfileButton() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const role = localStorage.getItem("role"); // Retrieve role from localStorage
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative" }}>
      {/* Profile Icon */}
      <button
        onClick={() => setModalIsOpen(!modalIsOpen)}
        style={{
          border: "none",
          background: "none",
        }}
      >
        <ProfileIcon height="40px" width="40px" />
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Profile Options"
        style={{
          overlay: {
            backgroundColor: "transparent",
          },
          content: {
            position: "absolute",
            top: "16vh",
            left: "81vw",
            width: "220px",
            height: "120px",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            width: "100%",
          }}
        >
          {/* Wallet Icon with Tooltip */}
          <div
            data-tooltip-id="wallet-tooltip"
            data-tooltip-content="Wallet"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/tourist/wallet")}
          >
            <FaWallet size={24} color="purple" />
          </div>

          {/* Bookmark Icon with Tooltip */}
          <div
            data-tooltip-id="bookmark-tooltip"
            data-tooltip-content="Bookmarks"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/tourist/bookmarks")}
          >
            <FaBookmark size={24} color="purple" />
          </div>

          {/* Settings Icon with Tooltip */}
          <div
            data-tooltip-id="settings-tooltip"
            data-tooltip-content="Settings"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setModalIsOpen(false);
              navigate("/settings");
            }}
          >
            <FaCog size={24} color="purple" />
          </div>

          {/* Logout Icon with Tooltip */}
          <div
            data-tooltip-id="logout-tooltip"
            data-tooltip-content="Logout"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setModalIsOpen(false);
              navigate("/logout"); // Replace with your logout functionality
            }}
          >
            <FaSignOutAlt size={24} color="purple" />
          </div>
        </div>

        {/* Tooltip instances */}
        <Tooltip id="wallet-tooltip" />
        <Tooltip id="bookmark-tooltip" />
        <Tooltip id="settings-tooltip" />
        <Tooltip id="logout-tooltip" />
      </Modal>
    </div>
  );
}

export default ProfileButton;
