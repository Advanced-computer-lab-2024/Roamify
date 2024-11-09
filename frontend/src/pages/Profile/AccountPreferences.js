// TouristProfileArea.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileSidebar from "./ProfileSideBar";
import EditIcon from "../../component/Icons/EditIcon";

const AccoutPreferences = ({ fields }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const role = localStorage.getItem("role");

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
        `http://localhost:3000/api/${role.toLocaleLowerCase()}/update-profile`,
        editFields,
        { withCredentials: true }
      );
      setProfile(editFields);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile: " + err.message);
    }
  };

  return (
    <div style={{ display: "flex", flex: 1, margin: "0 auto", height: "80vh" }}>
      {/* Sidebar */}

      {/* Profile Information */}
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
            Your Information
          </h3>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {Object.entries(editFields).map(([key, value]) => {
              // Skip certain fields
              if (
                key === "adult" ||
                key === "cardNumber" ||
                key === "cardValidUntil" ||
                key === "role" ||
                key === "logo" ||
                key === "profilePicture"
              )
                return null;

              if (key === "logo") {
                return <img src={value} key={key} />;
              }

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
                      color: "#333",
                      textTransform: "capitalize",
                      flex: 1,
                      textAlign: "left", // Align label to the left
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
                        color: "#555",
                        flex: 1,
                        textAlign: "center",
                      }}
                    >
                      {value}
                    </span> // Center uneditable value
                  )}
                  {key !== "username" && (
                    <button
                      type="button"
                      onClick={() => handleEditToggle(key)}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#007bff",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                    >
                      {isEditing[key] ? "✔️" : <EditIcon />}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Wallet Details Section */}
          {role === "tourist" && (
            <div>
              <h3 style={{ marginTop: "30px", color: "#333" }}>
                Wallet Details
              </h3>
              <ul style={{ listStyle: "none", padding: "0" }}>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ fontWeight: "bold", color: "#333" }}>
                    Card Number:
                  </span>
                  <span style={{ color: "#555", textAlign: "center", flex: 1 }}>
                    {editFields.cardNumber}
                  </span>
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ fontWeight: "bold", color: "#333" }}>
                    Card Valid Until:
                  </span>
                  <span style={{ color: "#555", textAlign: "center", flex: 1 }}>
                    {editFields.cardValidUntil}
                  </span>
                </li>
              </ul>
            </div>
          )}

          <button
            type="button"
            onClick={handleUpdateProfile}
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
              marginTop: "20px",
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccoutPreferences;
