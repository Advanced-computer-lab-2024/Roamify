import React, { useState } from "react";
import Modal from "react-modal";
import ProfileIcon from "../Icons/ProfileIcon";
import { useNavigate } from "react-router-dom";
import {
  FaWallet,
  FaBookmark,
  FaCog,
  FaSignOutAlt,
  FaBox,
  FaHeart,
  FaClipboardList,
} from "react-icons/fa";
import ThemeToggleButton from "../../pages/Home/ThemeToggleButton";
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
        <ProfileIcon height="30px" width="30px" />
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
            top: "12vh",
            left: "81vw",
            width: "215px",
            height: "fit-content",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "var(--secondary-color)",
          },
        }}
      >
        {/* Wallet Icon with Tooltip */}
        {role === "tourist" && (
          <div
            className="profile-nav"
            data-tooltip-id="wallet-tooltip"
            data-tooltip-content="Wallet"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/tourist/wallet")}
          >
            <FaWallet size={15} color="var(--text-color)" />
            Wallet
          </div>
        )}
        {role === "tourist" && (
          <div
            className="profile-nav"
            data-tooltip-id="wallet-tooltip"
            data-tooltip-content="Wallet"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/tourist/orders")}
          >
            <FaHeart
              style={{
                fontSize: "20px", // Adjust the icon size
                color: "var(--text-color)", // Set the color for the icon
              }}
            />
            Favorites
          </div>
        )}
        {role === "tourist" && (
          <div
            className="profile-nav"
            data-tooltip-id="wallet-tooltip"
            data-tooltip-content="Wallet"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/tourist/orders")}
          >
            <FaClipboardList size={15} color="var(--text-color)" />
            Orders
          </div>
        )}

        {/* Bookmark Icon with Tooltip */}
        {role === "tourist" && (
          <div
            className="profile-nav"
            data-tooltip-id="bookmark-tooltip"
            data-tooltip-content="Bookmarks"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/tourist/bookmarks")}
          >
            <FaBookmark size={15} color="var(--text-color)" />
            Bookmarks
          </div>
        )}
        {role === "tourist" && (
          <div
            className="profile-nav"
            data-tooltip-id="settings-tooltip"
            data-tooltip-content="Settings"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setModalIsOpen(false);
              navigate("/tourist/point");
            }}
          >
            <i class="fas fa-star"></i>
            Points
          </div>
        )}

        {/* Settings Icon with Tooltip */}
        <div
          className="profile-nav"
          data-tooltip-id="settings-tooltip"
          data-tooltip-content="Settings"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setModalIsOpen(false);
            navigate("/settings");
          }}
        >
          <FaCog size={15} color="var(--text-color)" />
          Settings
        </div>

        {/* Logout Icon with Tooltip */}
        <div
          className="profile-nav"
          data-tooltip-id="logout-tooltip"
          data-tooltip-content="Logout"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setModalIsOpen(false);
            navigate("/"); // Replace with your logout functionality
          }}
        >
          <FaSignOutAlt size={15} color="var(--text-color)" />
          Logout
        </div>
      </Modal>
    </div>
  );
}

export default ProfileButton;
