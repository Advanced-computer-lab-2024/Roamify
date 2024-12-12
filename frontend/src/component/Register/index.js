import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const RegisterArea = () => {
  const [selectedTab, setSelectedTab] = useState("tourist");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    mobileNumber: "",
    nationality: "",
    dateOfBirth: "",
    occupation: "employee",
    role: "tourist",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (selectedTab === "tourist") {
      try {
        // Step 1: Create User and capture token
        const createUserResponse = await axios.post(
          "http://localhost:3000/api/user/create-user",
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: "tourist",
          },
          {
            withCredentials: true,
          }
        );

        console.log(createUserResponse.data);

        const token = createUserResponse.data.token; // Capture token from response
        toast.success("User created successfully!");

        // Step 2: Create Profile with token in headers
        await axios.post(
          "http://localhost:3000/api/tourist/create-profile",
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            mobileNumber: formData.mobileNumber,
            nationality: formData.nationality,
            dateOfBirth: formData.dateOfBirth,
            occupation: formData.occupation,
          },
          {
            withCredentials: true,
          }
        );

        toast.success("Profile created successfully!");

        // Step 3: Login User
        await axios.post("http://localhost:3000/api/user/login", {
          username: formData.username,
          password: formData.password,
        });

        toast.success("Login successful!");

        // Navigate to the main page or another page as needed
        navigate("/login");
      } catch (error) {
        console.error("Error registering user:", error.message);
        toast.error("An error occurred during registration. Please try again.");
      }
    } else if (selectedTab === "business") {
      try {
        // Step 1: Create User
        const businessUserResponse = await axios.post(
          "http://localhost:3000/api/user/create-user",
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          },
          {
            withCredentials: true,
          }
        );
        toast.success("Business user created successfully!");
        console.log(businessUserResponse.data);

        // Save role to localStorage and navigate to upload-documents route
        localStorage.setItem("role", formData.role);
        navigate("/upload-documents");
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <section
      id="common_author_area"
      style={{ background: "var(--background-color)" }}
    >
      <Toaster position="top-right" reverseOrder={false} />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div
              className="common_author_boxed"
              style={{
                background: "var(--secondary-color)",
                borderRadius: "15px",
              }}
            >
              {/* Title */}
              <div className="common_author_heading">
                <h2>Register your account</h2>
              </div>

              {/* Tabs */}
              <div className="tab-container">
                <div
                  className={`tab ${selectedTab === "tourist" ? "active" : ""}`}
                  onClick={() => {
                    setSelectedTab("tourist");
                    setFormData((prev) => ({ ...prev, role: "tourist" }));
                  }}
                >
                  Tourist
                </div>
                <div
                  className={`tab ${
                    selectedTab === "business" ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedTab("business");
                    setFormData((prev) => ({ ...prev, role: "seller" })); // Default to seller for business users
                  }}
                >
                  Business User
                </div>
              </div>

              {/* Form Section */}
              <div className="common_author_form">
                <form onSubmit={handleRegister} id="main_author_form">
                  {selectedTab === "tourist" && (
                    <div
                      className="form_content"
                      style={{
                        background: "var(--secondary-color)",
                        borderRadius: "15px",
                        border: "1px solid var(--secondary-border-color)",
                      }}
                    >
                      {/* Tourist Registration Form */}
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          placeholder="Username"
                          value={formData.username}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="mobileNumber"
                          placeholder="Mobile Number"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="nationality"
                          placeholder="Nationality"
                          value={formData.nationality}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="date"
                          className="form-control"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleInputChange}
                        >
                          <option value="employee">Employee</option>
                          <option value="student">Student</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {selectedTab === "business" && (
                    <div
                      className="form_content"
                      style={{
                        background: "var(--secondary-color)",
                        borderRadius: "15px",
                        border: "1px solid var(--secondary-border-color)",
                      }}
                    >
                      {/* Business User Registration Form */}
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          placeholder="Username"
                          value={formData.username}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                        >
                          <option value="seller">Seller</option>
                          <option value="advertiser">Advertiser</option>
                          <option value="tourGuide">Tour Guide</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="common_form_submit">
                    <button type="submit" className="btn_theme">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterArea;
