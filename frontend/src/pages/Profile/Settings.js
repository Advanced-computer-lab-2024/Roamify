import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileSidebar from "./ProfileSideBar";
import AccoutPreferences from "./AccountPreferences";
import { Routes, Route } from "react-router-dom";
import SignInAndSecurity from "./SignInAndSecurity";
import SelectPreference from "./SelectPreference";

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

        const data = response.data; // Log the raw data
        console.log("Raw profile data:", data);

        let formattedData;

        // Format date fields for input if role is tourist
        if (role === "tourist") {
          formattedData = {
            ...data,
            dateOfBirth: data.dateOfBirth
              ? new Date(data.dateOfBirth).toISOString().split("T")[0]
              : null,
            cardValidUntil: data.cardValidUntil
              ? new Date(data.cardValidUntil).toISOString().split("T")[0]
              : null,
          };
        } else {
          formattedData = { ...data };
        }

        console.log("Formatted data:", formattedData);
        setFields(formattedData); // Update state with formatted data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [role]);

  useEffect(() => {
    console.log("Fields after setting:", fields); // Log `fields` to see if it's updating correctly
  }, [fields]);

  // Determine the profile picture or logo field based on the role
  const profilePicture =
    role === "tourGuide" ? fields.profilePicture : fields.logo;

  return (
    <section
      id="tour_booking_submission"
      style={{
        padding: "40px 0",
        backgroundColor: "var(--background-color)",
        minHeight: "120vh",
      }}
    >
      <div style={{ display: "flex", width: "80%", margin: "0 auto" }}>
        {/* Sidebar */}
        <ProfileSidebar profilePicture={profilePicture} />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<AccoutPreferences fields={fields} />} />
            <Route path="/sign-in-security" element={<SignInAndSecurity />} />
            <Route path="/select-preference" element={<SelectPreference />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Settings;
