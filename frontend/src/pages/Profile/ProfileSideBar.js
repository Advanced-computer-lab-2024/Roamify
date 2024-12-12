import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ProfileIcon from "../../component/Icons/ProfileIcon";

const ProfileSidebar = ({ profilePicture }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const role = localStorage.getItem("role");

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    if (role === "tourGuide") {
      formData.append("profilePicture", selectedFile);
    } else {
      formData.append("logo", selectedFile);
    }

    try {
      const endpoint =
        role === "tourGuide"
          ? "http://localhost:3000/api/tourguide/upload-profile-picture"
          : `http://localhost:3000/api/${role}/upload-logo`;

      await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      alert("Image uploaded successfully!");
      handleCloseModal(); // Close the modal after success
      window.location.reload(); // Reload the page to reflect the updated profile picture
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  return (
    <div
      style={{
        width: "200px",
        padding: "20px",
        backgroundColor: "var(--secondary-color)",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "inline-block",
          marginBottom: "20px",
        }}
      >
        {/* Profile Image */}
        {role === "tourGuide" ||
          role === "advertiser" ||
          (role === "seller" && (
            <>
              <img
                src={profilePicture}
                alt="Profile"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "contain",
                }}
              />

              <button
                onClick={handleEdit}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  backgroundColor: "#8b3eea",
                  border: "none",
                  borderRadius: "50%",
                  color: "#fff",
                  padding: "5px",
                  cursor: "pointer",
                }}
                aria-label="Edit Profile Picture"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </>
          ))}
      </div>

      <ul style={{ listStyle: "none", padding: "0" }}>
        <li style={{ marginBottom: "15px" }}>
          <Link
            to=""
            style={{
              textDecoration: "none",
              color: "#8b3eea",
              fontWeight: "bold",
            }}
          >
            My Account
          </Link>
        </li>
        <li>
          <Link
            to="sign-in-security"
            style={{
              textDecoration: "none",
              color: "#8b3eea",
              fontWeight: "bold",
            }}
          >
            Security
          </Link>
        </li>
        {role === "tourist" && (
          <li style={{ marginTop: "15px" }}>
            <Link
              to="select-preference"
              style={{
                textDecoration: "none",
                color: "#8b3eea",
                fontWeight: "bold",
              }}
            >
              My Preferences
            </Link>
          </li>
        )}
      </ul>

      {/* Modal for Uploading Profile Picture */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "400px",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
            }}
          >
            <h3>Upload Profile Picture</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ margin: "20px 0" }}
            />
            <div>
              <button
                onClick={handleSubmit}
                disabled={!selectedFile}
                style={{
                  backgroundColor: selectedFile ? "#007bff" : "#ddd",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: selectedFile ? "pointer" : "not-allowed",
                  marginRight: "10px",
                }}
              >
                Confirm
              </button>
              <button
                onClick={handleCloseModal}
                style={{
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSidebar;
