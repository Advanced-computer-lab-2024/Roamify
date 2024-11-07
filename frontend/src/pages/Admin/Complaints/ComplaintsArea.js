import React, { useState } from "react";
import ComplaintModal from "./ComplaintModal"; // Adjust path if needed

const ComplaintData = [
  {
    title: "Complaint 1",
    description: "This is a description for Complaint 1.",
    date: "2024-10-05",
    status: "Pending",
  },
  {
    title: "Complaint 2",
    description: "This is a description for Complaint 2.",
    date: "2024-10-12",
    status: "Resolved",
  },
  {
    title: "Complaint 3",
    description: "This is a description for Complaint 3.",
    date: "2024-10-20",
    status: "Pending",
  },
];

const ComplaintsArea = () => {
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Filter complaints based on selected status
  const filteredComplaints =
    filter === "All"
      ? ComplaintData
      : ComplaintData.filter((data) => data.status === filter);

  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
    setModalOpen(false);
  };

  return (
    <section id="explore_area" className="section_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            {/* Filter Buttons */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <button
                type="button"
                className={`btn ${
                  filter === "All" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setFilter("All")}
              >
                All
              </button>
              <button
                type="button"
                className={`btn ${
                  filter === "Pending" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setFilter("Pending")}
              >
                Pending
              </button>
              <button
                type="button"
                className={`btn ${
                  filter === "Resolved" ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => setFilter("Resolved")}
              >
                Resolved
              </button>
            </div>

            {/* Complaint Boxes - Stacked Vertically */}
            <div
              className="flight_search_result_wrapper"
              style={{ display: "block", gap: "20px" }}
            >
              {filteredComplaints.map((complaint, index) => (
                <div
                  className="flight_search_item_wrappper"
                  key={index}
                  style={{
                    width: "100%", // Full width for each complaint
                    backgroundColor: "#f9f9f9",
                    display: "flex",
                    flexDirection: "row", // Align content horizontally
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px",
                    marginBottom: "20px", // Space between boxes
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div style={{ flex: "1" }}>
                    <h3 style={{ marginBottom: "10px" }}>{complaint.title}</h3>
                    <h5>Date: {complaint.date}</h5>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      style={{
                        padding: "10px 15px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => openModal(complaint)}
                    >
                      View Details
                    </button>

                    {complaint.status === "Pending" && (
                      <button
                        style={{
                          padding: "10px 15px",
                          backgroundColor: "#28a745",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                        onClick={() => {}}
                      >
                        Resolve
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <ComplaintModal
          isOpen={modalOpen}
          onClose={closeModal}
          description={selectedComplaint?.description}
        />
      )}
    </section>
  );
};

export default ComplaintsArea;
