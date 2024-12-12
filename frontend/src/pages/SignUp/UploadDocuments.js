import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingLogo from "../../component/LoadingLogo";
import { camelToReg } from "../../functions/camelToReg";

const UploadDocuments = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const documentRequirements = {
    tourGuide: ["ID", "additionalDocument"],
    advertiser: ["ID", "additionalDocument"],
    seller: ["ID", "additionalDocument"],
  };

  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e, docType) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [docType]: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(files).forEach((docType) => {
      formData.append(docType, files[docType]);
    });

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--background-color)",
      }}
    >
      {loading ? (
        <LoadingLogo isVisible={true} size="100px" />
      ) : (
        <div
          style={{
            maxWidth: "400px",
            width: "100%",
            padding: "20px",
            backgroundColor: "var(--secondary-color)",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <h2>Upload Required Documents</h2>
          <p
            style={{
              color: "var(--dashboard-title-color)",
              marginBottom: "10px",
            }}
          >
            {" "}
            Please upload the following documents:
          </p>
          <form onSubmit={handleSubmit}>
            {documentRequirements[role]?.map((doc, index) => (
              <div key={index} style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  {index != 0 ? camelToReg(doc) : doc}:
                </label>
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, doc)}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid var(--secondary-border-color)",
                  }}
                />
              </div>
            ))}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "var(--main-color)",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Submit Documents
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UploadDocuments;

// Add spinner animation to global CSS
