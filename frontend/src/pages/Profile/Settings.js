// TouristProfileArea.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileSidebar from "./ProfileSideBar";
import EditIcon from "../../component/Icons/EditIcon";
import AccoutPreferences from "./AccountPreferences";
import { Routes, Route } from "react-router-dom";
import SignInAndSecurity from "./SignInAndSecurity";
import SelectPreference from "./SelectPreference";
const Settings = () => {
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
            <Route path="/select-preference" element={<SelectPreference />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Settings;
