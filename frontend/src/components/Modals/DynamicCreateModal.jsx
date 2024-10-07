import React, { useState } from "react";

const DynamicCreateModal = ({ isOpen, onClose, fields, onSubmit }) => {
  // Initialize formData with empty values for each field
  const [formData, setFormData] = useState(() => {
    return fields.reduce((acc, field) => {
      acc[field.name] = ""; // Set all fields to empty string initially
      return acc;
    }, {});
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-lg relative">
        {/* Close button in the top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-xl font-semibold mb-4">Create New Entry</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label htmlFor={field.name} className="block text-gray-700">
                {field.label || field.name}
              </label>
              <input
                type={field.type || "text"} // Use the dynamic type here
                id={field.name}
                name={field.name}
                value={formData[field.name]} // The field value is empty initially
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                placeholder={field.placeholder || ""}
              />
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicCreateModal;
