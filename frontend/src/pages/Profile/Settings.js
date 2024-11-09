// TouristProfileArea.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileSidebar from "./ProfileSideBar";
import AccoutPreferences from "./AccountPreferences";
import { Routes, Route } from "react-router-dom";
import SignInAndSecurity from "./SignInAndSecurity";

const Settings = () => {
  const [fields, setFields] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/${role}/get-profile`,
          { withCredentials: true }
        );
        const data = response.data;
        let formattedData;

        // Format date fields for input
        if (role === "tourist") {
          formattedData = {
            ...data,
            dateOfBirth: new Date(data.dateOfBirth).toISOString().split("T")[0],
            cardValidUntil: new Date(data.cardValidUntil)
              .toISOString()
              .split("T")[0],
          };
        } else {
          formattedData = { ...data };
        }

        setFields(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [role]);

  // Determine the profile picture or logo field based on the role
  const profilePicture =
    role === "tourGuide" ? fields.profilePicture : fields.logo;

  return (
    <section
      id="tour_booking_submission"
      style={{ padding: "40px 0", backgroundColor: "#f9f9f9" }}
    >
      <div style={{ display: "flex", width: "80%", margin: "0 auto" }}>
        {/* Sidebar */}
        <ProfileSidebar profilePicture={profilePicture} />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<AccoutPreferences fields={fields} />} />
            <Route path="/sign-in-security" element={<SignInAndSecurity />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Settings;
