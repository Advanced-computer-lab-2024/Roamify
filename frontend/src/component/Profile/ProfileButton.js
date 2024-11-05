import React, { useState } from "react";
import Modal from "react-modal";
import ProfileIcon from "../Icons/ProfileIcon";
import { Link } from "react-router-dom";

function ProfileButton() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
            height: "200px",
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
          <Link to={""}>
            <button onClick={() => setModalIsOpen(false)}>Logout</button>
          </Link>
        </div>
      </Modal>
    </div>
  );
}

export default ProfileButton;
