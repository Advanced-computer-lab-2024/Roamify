import React from "react";
import Modal from "react-modal"; // Assuming you're using `react-modal` for modal implementation

Modal.setAppElement("#root"); // Replace with your app root ID

const DateSelectionModal = ({
  isOpen,
  availableDates,
  onClose,
  onSelectDate,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Select Date"
      className="date-selection-modal"
      overlayClassName="date-selection-overlay"
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          height: "40vh",
          width: "400px",
          margin: "auto",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--secondary-color)",
          border: "none",
        },
      }}
    >
      <div className="modal-header">
        <h2>Select a Date</h2>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="modal-body">
        {availableDates.length > 0 ? (
          <ul
            className="date-list"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {availableDates.map((date, index) => (
              <li key={index}>
                <button
                  className="date-button"
                  onClick={() =>
                    onSelectDate(new Date(date).toISOString().split("T")[0])
                  }
                >
                  {new Date(date).toLocaleDateString()}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No available dates for this itinerary.</p>
        )}
      </div>
    </Modal>
  );
};

export default DateSelectionModal;
