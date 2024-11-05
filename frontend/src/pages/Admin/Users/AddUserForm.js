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
      .post(`http://localhost:3000/api/admin/${newUserType}`, data, {
        withCredentials: true,
      })
      .then((res) => {
        // Pass the created user data back
        onClose();
        if (res) console.log("Signup Data Sent:", res.data);
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
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "16px",
        border: "1px solid #D1D5DB",
        borderRadius: "8px",
        backgroundColor: "#F3F4F6",
      }}
      onSubmit={handleSubmit}
    >
      {/* Username Field */}
      <div style={{ marginBottom: "16px" }}>
        <label
          htmlFor="username"
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "500",
            marginBottom: "8px",
          }}
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "8px 16px",
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            outline: "none",
            boxShadow: "0 0 0 2px transparent",
            transition: "box-shadow 0.2s",
          }}
          onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #3B82F6")}
          onBlur={(e) => (e.target.style.boxShadow = "0 0 0 2px transparent")}
          required
        />
      </div>

      {/* Password Field */}
      <div style={{ marginBottom: "16px" }}>
        <label
          htmlFor="password"
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "500",
            marginBottom: "8px",
          }}
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "8px 16px",
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            outline: "none",
            boxShadow: "0 0 0 2px transparent",
            transition: "box-shadow 0.2s",
          }}
          onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #3B82F6")}
          onBlur={(e) => (e.target.style.boxShadow = "0 0 0 2px transparent")}
          required
        />
      </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        style={{
          width: "100%",
          backgroundColor: "#3B82F6",
          color: "#FFFFFF",
          textAlign: "center",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          border: "none",
          outline: "none",
          transition: "background-color 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#2563EB")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#3B82F6")}
      >
        Create
      </button>
    </form>
  );
};

export default CreateUserSignUpForm;
