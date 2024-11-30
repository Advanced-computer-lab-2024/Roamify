import React, { useState } from "react";
import CardsSection from "./CardsSection";
import { FaCalendarAlt, FaMinusCircle } from "react-icons/fa"; // Import calendar and minus icons
import DatePicker from "react-datepicker"; // Import the datepicker component
import "react-datepicker/dist/react-datepicker.css"; // Import datepicker CSS

const Dashboard = () => {
  const [showCalendar, setShowCalendar] = useState(false); // State to control calendar visibility
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date

  // Toggle calendar visibility
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Handle date selection
  const handleDateChange = (date) => {
    // Format the date as YYYY-MM-DD
    const formattedDate = date.toISOString().split("T")[0]; // Get the date in the format YYYY-MM-DD
    setSelectedDate(formattedDate); // Set the formatted date
    setShowCalendar(false); // Close calendar after date selection
  };

  // Reset selected date
  const resetDate = () => {
    setSelectedDate(null); // Reset the selected date to null
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2vh",
        boxSizing: "border-box",
        flex: 1,
        padding: "10px",
        margin: "0px 40px",
      }}
    >
      <div style={{ padding: "10px", display: "flex", position: "relative" }}>
        <div>
          <p style={{ fontSize: "20px" }}>Your Dashboard</p>
          <p>{selectedDate ? selectedDate : "No date selected"}</p>{" "}
          {/* Display selected date or message */}
        </div>
        <div style={{ marginLeft: "auto", display: "flex" }}>
          {selectedDate && (
            <button
              style={{
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "top",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "14px",
                color: "var(--dashboard-title-color)",
              }}
              onClick={resetDate}
            >
              Reset Date
            </button>
          )}
          <button
            style={{
              padding: "10px",
              backgroundColor: "transparent",
              cursor: "pointer",
              fontSize: "20px",
              color: "var(--dashboard-title-color)",
              display: "flex",
              borderRadius: "999px",
            }}
            onClick={toggleCalendar}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--background-color)")
            } // Hover color
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <FaCalendarAlt />
          </button>
        </div>

        {/* Datepicker - only visible when showCalendar is true */}
        {showCalendar && (
          <div
            style={{
              position: "absolute",
              top: "50px",
              right: "20px",
              zIndex: "10", // Make sure it’s on top of other content
            }}
          >
            <DatePicker
              selected={selectedDate ? new Date(selectedDate) : null} // If a date is selected, show it in the datepicker
              onChange={handleDateChange}
              inline
            />
          </div>
        )}
      </div>

      <CardsSection date={selectedDate} />
    </div>
  );
};

export default Dashboard;
