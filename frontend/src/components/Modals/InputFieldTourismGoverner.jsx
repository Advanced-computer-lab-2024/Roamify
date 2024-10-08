// InputField.jsx (Simplified version)
import React from "react";

const InputField = ({ label, type, name, value, onChange, required, rows }) => {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          className="p-2 border rounded-md mt-1"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="p-2 border rounded-md mt-1"
        />
      )}
    </div>
  );
};

export default InputField;
