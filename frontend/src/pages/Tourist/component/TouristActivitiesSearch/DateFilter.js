import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateFilter = ({ date, setdate, onApply }) => {
  return (
    <div>
      <h4>Date Range</h4>
      <div>
        <label>Start Date:</label>
        <DatePicker
          selected={date}
          onChange={(date) => setdate(date)}
          selectsStart
          date={date}
          
        />
      </div>
      <button className="apply" type="button" onClick={onApply}>
        Apply
      </button>
    </div>
  );
};

export default DateFilter;
