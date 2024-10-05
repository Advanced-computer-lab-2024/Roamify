import React, { useState } from "react";

const CreateUserSignUpForm = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform sign-up logic here, e.g., send form data to the server
    onCreate();
    onClose();

    console.log("Signup Data:", formData);
  };

  return (
    <form
      className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg bg-secondary"
      onSubmit={handleSubmit}
    >
      {/* Username Field */}
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Password Field */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        className="w-full bg-accent text-center text-white py-2 px-4 rounded-lg hover:bg-accentHover focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        Create
      </button>
    </form>
  );
};

export default CreateUserSignUpForm;
