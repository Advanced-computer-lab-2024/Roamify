import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateFilter = ({ date, setDate, onApply }) => {
  return (
    <div>
      <h4>Date Range</h4>
      <div>
        <label>Choose Date:</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy" // Setting the date format here
          isClearable
          placeholderText="Select a date"
        />
      </div>
      <button onClick={() => onApply(date)} className="btn btn_theme btn_sm" style={{ marginTop: "10px" }}>
        Apply
      </button>
    </div>
  );
};

export default DateFilter;
