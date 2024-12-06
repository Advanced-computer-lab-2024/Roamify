import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Importing react-hot-toast

const CreateUserSignUpForm = ({ onClose, newUserType, fetchUsers }) => {
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
    const data = {
      username: formData.username,
      password: formData.password,
    };

    axios
      .post(`http://localhost:3000/api/admin/${newUserType}`, data, {
        withCredentials: true,
      })
      .then((res) => {
        // Handle success response
        onClose();
        if (newUserType === "add-tourism-governor") fetchUsers();
        if (res) console.log("Signup Data Sent:", res.data);
        toast.success("User created successfully!"); // Success toast notification
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          const errorMessage = err.response.data.message;
          if (errorMessage === "Username already Exists") {
            toast.error(
              "Error: Username already exists. Please choose a different username."
            );
          } else {
            toast.error(`Error: ${errorMessage}`);
          }
        } else {
          toast.error(`An unexpected error occurred: ${err.toString()}`);
        }
      });
  };

  return (
    <>
      <form
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          padding: "16px",
          // border: "1px solid var(--main-color)",
          borderRadius: "8px",
          backgroundColor: "var(--secondary-color)",
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
              border: "1px solid var(--dashboard-title-color)",
              borderRadius: "8px",
              background: "var(--background-color)",
              outline: "none",
              boxShadow: "0 0 0 2px transparent",
              transition: "box-shadow 0.2s",
              color: "var(--text-color)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--main-color)")}
            onBlur={(e) => (
              (e.target.style.boxShadow = "0 0 0 2px transparent"),
              (e.target.style.borderColor = "var(--dashboard-title-color)")
            )}
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
              border: "1px solid var(--dashboard-title-color)",
              borderRadius: "8px",
              background: "var(--background-color)",
              outline: "none",
              boxShadow: "0 0 0 2px transparent",
              transition: "box-shadow 0.2s",
              color: "var(--text-color)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--main-color)")}
            onBlur={(e) => (
              (e.target.style.boxShadow = "0 0 0 2px transparent"),
              (e.target.style.borderColor = "var(--dashboard-title-color)")
            )}
            required
          />
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            backgroundColor: "var(--main-color)",
            color: "#FFFFFF",
            textAlign: "center",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            border: "none",
            outline: "none",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "var(--main-color-hover)")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "var(--main-color)")
          }
        >
          Create
        </button>
      </form>

      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};

export default CreateUserSignUpForm;
