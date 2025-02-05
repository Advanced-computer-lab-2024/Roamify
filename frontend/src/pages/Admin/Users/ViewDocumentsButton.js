// ViewDocumentsButton.js
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { camelToReg } from "../../../functions/camelToReg";

const ViewDocumentsButton = ({ userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documents, setDocuments] = useState({});
  const [loading, setLoading] = useState(false);

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/admin/view-uploaded-docs/${userId}`,
        { withCredentials: true }
      );
      const docs = response.data || {}; // Set as an empty object if response is null
      console.log(response.data);
      setDocuments(docs);
      setLoading(false);

      if (Object.keys(docs).length > 0) {
        toast.success("Documents loaded successfully!");
      } else {
        toast("No documents available for this user.");
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast.error("Failed to load documents.");
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDocuments({});
  };

  return (
    <>
      <button onClick={handleOpenModal} className="btn btn_theme btn_sm">
        View Documents
      </button>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "80%",
              maxWidth: "600px",
              height: "70vh", // Fixed taller height
              overflowY: "auto", // Scroll if content exceeds height
              position: "relative",
            }}
          >
            <h3>Documents</h3>
            <button
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "gray",
              }}
            >
              &times;
            </button>

            {loading ? (
              <p>Loading documents...</p>
            ) : Object.keys(documents).length > 0 ? (
              <ul>
                {Object.entries(documents).map(([docType, url], index) => (
                  <li key={index}>
                    <strong>
                      {docType !== "IDs" ? camelToReg(docType) : docType}:
                    </strong>{" "}
                    <a
                      href={url} // Direct link to the document URL
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Document
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No documents found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewDocumentsButton;
