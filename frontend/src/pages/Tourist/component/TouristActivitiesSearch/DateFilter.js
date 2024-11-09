import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateFilter = ({ startDate, endDate, setStartDate, setEndDate, onApply }) => {
  return (
    <div>
      <h4>Date Range</h4>
      <div>
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate} // Ensures end date is not before start date
        />
      </div>
      <button onClick={() => onApply({ startDate, endDate })} className="btn btn_theme btn_sm" style={{ marginTop: "10px" }}>
        Apply
      </button>
    </div>
  );
};

export default DateFilter;
