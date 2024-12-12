import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import css

const ProfileDetails = () => {
  const role = localStorage.getItem("role")?.toLowerCase().replace(/-/g, ""); // Normalize role
  const navigate = useNavigate();

  const profileRequirements = {
    tourguide: ["mobileNumber", "yearsOfExperience", "previousWork"],
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

  const formatLabel = (label) => {
    return label
      .replace(/([A-Z])/g, " $1") // Insert space before any uppercase letter
      .trim() // Remove leading and trailing whitespace
      .split(" ") // Split into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(" "); // Join words back into a single string
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value // Keep the original case of the input
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

  // Inline styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  const formStyle = {
    width: '300px',
    padding: '20px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    borderRadius: '5px', // Optional rounded corners
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderColor: '#8b3eea', // Your specified color
    borderWidth: '2px',
    borderRadius: '3px', // Optional rounded corners for inputs
  };

  return (
    <div style={containerStyle}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <h2 style={{ marginBottom: '20px', fontSize:'24px'}}>Update your profile:</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        {profileRequirements[role]?.map((field, index) => (
          <div key={index}>
            <label style={{ marginBottom: '5px' }}>{formatLabel(field)}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder={`Enter your ${formatLabel(field)}`}
            />
          </div>
        ))}
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#8b3eea', color: 'white', border: 'none', borderRadius: '3px' }}>Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileDetails;
