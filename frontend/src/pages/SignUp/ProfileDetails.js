import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import css

const ProfileDetails = () => {
  const role = localStorage.getItem("role")?.toLowerCase().replace(/-/g, ""); // Normalize role
  const navigate = useNavigate();

  // Set up the fields based on the role requirements
  const profileRequirements = {
    tourguide: [
      "mobileNumber",
      "yearsOfExperience",
      "previousWork", // Camel case for form submission
    ],
    advertiser: ["companyName", "websiteLink", "hotline", "companyProfile"],
    seller: ["firstName", "lastName", "description"],
  };

  const [formData, setFormData] = useState(
    profileRequirements[role]?.reduce(
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
        `http://localhost:3000/api/${role}/create-profile`,
        formData,
        { withCredentials: true }
      );
      toast.success("Profile created successfully.");
      navigate(`/${role}`);
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.error("Failed to create profile. Please try again.");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
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
