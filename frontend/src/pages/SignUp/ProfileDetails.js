import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileDetails = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // Set up the fields based on the role requirements
  const profileRequirements = {
    tourguide: [
      "mobileNumber",
      "yearsOfExperience",
      "previousWork", // Camel case for form submission
    ],
    advertiser: ["companyWebsite", "hotline", "companyProfile"],
    seller: ["firstName", "lastName", "description"],
  };

  const [formData, setFormData] = useState(
    profileRequirements[role.toLowerCase().replace(/-/g, "")]?.reduce(
      (acc, field) => {
        acc[field] = "";
        return acc;
      },
      {}
    ) || {}
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/${role
          .toLowerCase()
          .replace(/-/g, "")}/create-profile`,
        formData,
        { withCredentials: true }
      );
      alert("Profile created successfully.");
      navigate(`/${role}`);
    } catch (error) {
      console.error("Error creating profile:", error);
      alert("Failed to create profile. Please try again.");
    }
  };

  return (
    <div>
      <h2>Profile Details</h2>
      <p>Update your profile information:</p>
      <form onSubmit={handleSubmit}>
        {profileRequirements[role]?.map((field, index) => (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <label>{field.replace(/([A-Z])/g, " $1")}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              placeholder={`Enter your ${field.replace(/([A-Z])/g, " $1")}`}
            />
          </div>
        ))}
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileDetails;
