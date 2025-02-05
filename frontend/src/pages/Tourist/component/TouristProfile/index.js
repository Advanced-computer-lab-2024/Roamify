import React, { useEffect, useState } from "react";
import axios from "axios";
import Icon from "../../../../assets/img/icon/right.png";
import EditIcon from "../../../../component/Icons/EditIcon";

const TouristProfileArea = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [isEditing, setIsEditing] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/tourist/get-profile",
          { withCredentials: true }
        );
        const data = response.data;

        // Format date fields for input
        const formattedData = {
          ...data,
          dateOfBirth: new Date(data.dateOfBirth).toISOString().split("T")[0],
          cardValidUntil: new Date(data.cardValidUntil)
            .toISOString()
            .split("T")[0],
        };

        setProfile(formattedData);
        setEditFields(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleFieldChange = (field, value) => {
    setEditFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put(
        "http://localhost:3000/api/tourist/update-profile",
        editFields,
        { withCredentials: true }
      );
      setProfile(editFields);
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile: " + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section
      id="tour_booking_submission"
      style={{ padding: "40px 0", backgroundColor: "#f9f9f9" }}
    >
      <div style={{ width: "80%", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ maxWidth: "900px", width: "100%" }}>
            {/* Profile Information Section */}
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
                    key === "role"
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
                            onChange={(e) =>
                              handleFieldChange(key, e.target.value)
                            }
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
                            onChange={(e) =>
                              handleFieldChange(key, e.target.value)
                            }
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
      </div>
    </section>
  );
};

export default TouristProfileArea;
