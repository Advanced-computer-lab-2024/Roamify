import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadDocuments = () => {
  const role = localStorage.getItem("role"); // Get the role from local storage
  const token = localStorage.getItem("token"); // Retrieve token from localStorage if stored
  const navigate = useNavigate();

  const documentRequirements = {
    tourGuide: ["ID", "Certificates"],
    advertiser: ["ID", "Taxation Registry Card"],
    seller: ["ID", "Taxation Registry Card"],
  };

  // Initialize state to hold files for each required document
  const [files, setFiles] = useState({});

  // Handle file selection
  const handleFileChange = (e, docType) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [docType]: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Append each file to the formData
    Object.keys(files).forEach((docType) => {
      formData.append(docType, files[docType]);
    });

    try {
      // Send the formData to the backend
      await axios.post(
        "http://localhost:3000/api/user/upload-documents",
        formData,
        {
          withCredentials: true, // Include cookies if needed
        }
      );

      // Navigate to pending-acceptance route upon successful upload
      navigate("/pending-acceptance");
    } catch (error) {
      console.error("Error uploading documents:", error);
      alert("Failed to upload documents. Please try again.");
    }
  };

  return (
    <div>
      <h2>Upload Required Documents</h2>
      <p>Please upload the following documents:</p>
      <form onSubmit={handleSubmit}>
        {documentRequirements[role]?.map((doc, index) => (
          <div key={index}>
            <label>{doc}:</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, doc)}
              required
            />
          </div>
        ))}
        <button type="submit">Submit Documents</button>
      </form>
    </div>
  );
};

export default UploadDocuments;
