import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileSidebar from "./ProfileSideBar";
import EditIcon from "../../component/Icons/EditIcon";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../component/Modals/ConfirmModal";

const AccountPreferences = ({ fields }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    setEditFields(fields);
  }, [fields]);

  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleFieldChange = (field, value) => {
    setEditFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/${role.toLowerCase()}/update-profile`,
        editFields,
        { withCredentials: true }
      );
      setProfile(editFields);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile: " + err.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/user/delete-account`, {
        withCredentials: true,
      });
      alert("Account deleted successfully.");
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      alert("Failed to delete account: " + err.response.data.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        margin: "0 auto",
        height: "100vh",
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            padding: "20px",
            background: "var(--secondary-color)",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            marginLeft: "30px",
            height: "100%",
          }}
        >
          <h3 style={{ marginBottom: "20px", color: "var(--text-color)" }}>
            Your Information
          </h3>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {Object.entries(editFields).map(([key, value]) => {
              if (
                key === "adult" ||
                key === "cardNumber" ||
                key === "cardValidUntil" ||
                key === "role" ||
                key === "logo" ||
                key === "profilePicture" ||
                key === "wallet"
              )
                return null;

              return (
                <li
                  key={key}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "var(--text-color)",
                      textTransform: "capitalize",
                      flex: 1,
                      textAlign: "left",
                    }}
                  >
                    {key.replace(/([A-Z])/g, " $1")}:
                  </span>
                  {isEditing[key] ? (
                    key.toLowerCase().includes("date") ? (
                      <input
                        type="date"
                        value={value}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                        style={{
                          padding: "5px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          flex: 1,
                          marginLeft: "10px",
                        }}
                      />
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                        style={{
                          padding: "5px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          flex: 1,
                          marginLeft: "10px",
                        }}
                      />
                    )
                  ) : (
                    <span
                      style={{
                        color: "var(--dashboard-title-color)",
                        flex: 1,
                        textAlign: "center",
                      }}
                    >
                      {value}
                    </span>
                  )}
                  {key !== "username" && (
                    <button
                      type="button"
                      onClick={() => handleEditToggle(key)}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "var(--dashboard-title-color)",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                    >
                      {isEditing[key] ? (
                        "✔️"
                      ) : (
                        <EditIcon fill="var(--text-color)" />
                      )}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          <div style={{ marginTop: "17vh" }}>
            <button
              type="button"
              onClick={handleUpdateProfile}
              style={{
                display: "block",
                width: "100%",
                padding: "10px 0",
                backgroundColor: "#8b3eea",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "auto",
              }}
            >
              Confirm
            </button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)} // Open the modal
              style={{
                display: "block",
                width: "100%",
                padding: "10px 0",
                backgroundColor: "#8b3eea",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
};

export default AccountPreferences;
