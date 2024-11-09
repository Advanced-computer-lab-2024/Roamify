import React from "react";

const ProfileDetails = () => {
  const role = localStorage.getItem("role");

  const profileRequirements = {
    tourGuide: [
      "Mobile Number",
      "Years of Experience",
      "Previous Work (if exists)",
    ],
    advertiser: ["Company Website", "Hotline", "Company Profile"],
    seller: ["Name", "Description"],
  };

  return (
    <div>
      <h2>Profile Details</h2>
      <p>Update your profile information:</p>
      <form>
        {profileRequirements[role]?.map((field, index) => (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <label>{field}</label>
            <input type="text" placeholder={`Enter your ${field}`} />
          </div>
        ))}
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileDetails;
