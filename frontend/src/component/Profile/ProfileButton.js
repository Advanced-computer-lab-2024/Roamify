import React, { useState } from "react";
import Modal from "react-modal";
import ProfileIcon from "../Icons/ProfileIcon";
import { Link, useNavigate } from "react-router-dom";
import AddUserButton from "../../pages/Admin/Users/AddUserButton";
import Wallet from "../../pages/Profile/Wallet";
function ProfileButton() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [walletModalIsOpen, setWalletModalIsOpen] = useState(false);
  const role = localStorage.getItem("role"); // Retrieve role from localStorage
  const navigate = useNavigate();

  const handleAddAdmin = () => {
    setModalIsOpen(false);
    navigate("/add-admin"); // Navigate to the add admin page
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setModalIsOpen(!modalIsOpen)}
        style={{ border: "none", background: "none" }}
      >
        <ProfileIcon height="5vh" width="5vw" />
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
            width: "200px",
            height: role === "admin" ? "240px" : "200px", // Adjust height if admin
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Link to={""}>
            <button onClick={() => setModalIsOpen(false)}>Profile</button>
          </Link>
          <Link to={"/settings"}>
            <button onClick={() => setModalIsOpen(false)}>Settings</button>
          </Link>
          {role === "tourist" && (
        <button
          onClick={() => {
            // Redirect to the WalletPage when the button is clicked
            navigate("/tourist/wallet");
          }}
        >
          Wallet
        </button>
      )}
          {role === "admin" && <AddUserButton userType={"admin"} />}
          <Link to={""}>
            <button onClick={() => setModalIsOpen(false)}>Logout</button>
          </Link>
        </div>
      </Modal>
     
    </div>
  );
}

export default ProfileButton;
