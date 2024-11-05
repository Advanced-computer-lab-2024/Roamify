import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileSidebar from "./ProfileSideBar";

const SignInAndSecurity = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-center", // Use string literal
      });
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/user/change-password",
        {
          oldPassword: currentPassword,
          newPassword1: newPassword,
          newPassword2: newPassword,
        },
        { withCredentials: true }
      );
      toast.success("Password changed successfully!", {
        position: "top-center", // Use string literal
      });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const { message } = err.response.data;
        toast.error(`Error: ${message}`, {
          position: "top-center", // Use string literal
        });
      } else {
        toast.error("Failed to change password.", {
          position: "top-center", // Use string literal
        });
      }
    }
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        width: "80%",
        margin: "0 auto",
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ marginBottom: "20px", color: "#333" }}>
            Sign-In and Security
          </h3>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{ display: "block", fontWeight: "bold", color: "#333" }}
            >
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{ display: "block", fontWeight: "bold", color: "#333" }}
            >
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{ display: "block", fontWeight: "bold", color: "#333" }}
            >
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                marginTop: "5px",
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleChangePassword}
            style={{
              display: "block",
              width: "100%",
              padding: "10px 0",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Change Password
          </button>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default SignInAndSecurity;
