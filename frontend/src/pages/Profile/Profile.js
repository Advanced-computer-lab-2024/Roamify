// TouristProfileArea.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileSidebar from "./ProfileSideBar";
import EditIcon from "../../component/Icons/EditIcon";
import AccoutPreferences from "./AccountPreferences";
import { Routes, Route } from "react-router-dom";
import SignInAndSecurity from "./SignInAndSecurity";

const Profile = () => {
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
      <div style={{ display: "flex", width: "80%", margin: "0 auto" }}>
        {/* Sidebar */}
        <ProfileSidebar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<AccoutPreferences />} />
            <Route path="/sign-in-security" element={<SignInAndSecurity />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Profile;
