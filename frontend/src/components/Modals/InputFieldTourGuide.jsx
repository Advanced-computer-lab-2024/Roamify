import React from "react";

const InputField = ({ label, type, name, value, onChange, required }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange} // Ensure onChange is passed correctly
      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      required={required}
    />
  </div>
);

export default InputField;
