import React, { useState } from "react";
import axios from "axios";

const CreateUserSignUpForm = ({ onClose, newUserType }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
    const data = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    axios
      .post(`http://localhost:3000/admin/${newUserType}`, data)
      .then((result) => {
        onCreate(result.data); // Pass the created user data back
        onClose();
        if (res) console.log("Signup Data Sent:", data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          const errorMessage = err.response.data.message;
          if (errorMessage === "Email already exists") {
            alert("Error: Email already exists. Please use a different email.");
          } else if (errorMessage === "Username already Exists") {
            alert(
              "Error: Username already exists. Please choose a different username."
            );
          } else {
            alert(`Error: ${errorMessage}`);
          }
        } else {
          alert(`An unexpected error occurred: ${err.toString()}`);
        }
      });
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
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
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
