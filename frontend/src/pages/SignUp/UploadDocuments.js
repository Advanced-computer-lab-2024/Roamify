import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadDocuments = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const documentRequirements = {
    tourGuide: ["ID", "additionalDocument"], // Updated field names to match API requirements
    advertiser: ["ID", "additionalDocument"],
    seller: ["ID", "additionalDocument"],
  };

  const [files, setFiles] = useState({});

  const handleFileChange = (e, docType) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [docType]: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(files).forEach((docType) => {
      formData.append(docType, files[docType]);
    });

    // Log formData content for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      await axios.post(
        "http://localhost:3000/api/user/upload-documents",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

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
