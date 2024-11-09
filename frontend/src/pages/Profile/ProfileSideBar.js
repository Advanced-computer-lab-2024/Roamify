import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const ProfileSidebar = () => {
  const role = localStorage.getItem("role");

  return (
    <div
      style={{
        width: "250px",
        padding: "20px",
        backgroundColor: "#f8f8f8",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        height: "80vh",
      }}
    >
      <h3 style={{ color: "#333", marginBottom: "20px" }}>Profile</h3>
      <ul style={{ listStyle: "none", padding: "0" }}>
        <li style={{ marginBottom: "15px" }}>
          <Link
            to=""
            style={{
              textDecoration: "none",
              color: "#007bff",
              fontWeight: "bold",
            }}
          >
            Account Preferences
          </Link>
        </li>
        <li>
          <Link
            to="sign-in-security"
            style={{
              textDecoration: "none",
              color: "#007bff",
              fontWeight: "bold",
            }}
          >
            Sign In and Security
          </Link>
        </li>
        {role === "tourist" && (
          <li style={{ marginTop: "15px" }}>
            <Link
              to="select-preference"
              style={{
                textDecoration: "none",
                color: "#007bff",
                fontWeight: "bold",
              }}
            >
              Select Preference
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProfileSidebar;
