import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import axios from "axios";
import io from "socket.io-client";
import { toKebabCase } from "../../functions/toKebabCase.js";

const LoginArea = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        { username: username, password: password },
        { withCredentials: true }
      );

      // Extract response data
      const {
        status,
        idDocument,
        additionalDocument,
        termsAndConditions,
        role,
      } = response.data;
      console.log(response.data);
      // Store user role in localStorage
      localStorage.setItem("role", role);

      setupSocket();
      // Determine the correct navigation route based on conditions
      if (status === "active") {
        navigate(`/${toKebabCase(role)}`); // Navigate to stakeholder's page
      } else if (status === "pending" && (!idDocument || !additionalDocument)) {
        navigate("/upload-documents"); // Navigate to UploadDocuments page
      } else if (status === "pending" && idDocument && additionalDocument) {
        navigate("/pending-acceptance"); // Navigate to PendingAcceptance page
      } else if (status === "pending creation" && !termsAndConditions) {
        navigate("/accept-conditions"); // Navigate to AcceptConditions page
      } else if (status === "pending creation" && termsAndConditions) {
        navigate("/profile-details"); // Navigate to ProfileDetails page
      }
    } catch (err) {
      console.error("Error logging in:", err);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const setupSocket = () => {
    // Check if token is available in cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1]; // Replace 'token' with the actual cookie name

    console.log("Token from cookie: ", token); // Log the token from the cookies

    const socket = io("http://localhost:3000", {
      withCredentials: true,
    });

    // Event listener for successful connection
    socket.on("connect", () => {
      console.log(`Connected to the server with socket ID: ${socket.id}`);
    });

    // Event listener for connection errors
    socket.on("connect_error", (err) => {
      console.error("Connection failed:", err.message);
    });

    // Event listener for custom server messages
    socket.on("receiveNotification", (data) => {
      console.log("Message from server:", data);
      toast.info(data);
      console.log("hii");
    });

    // Event listener for disconnection
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return socket;
  };

  return (
    <>
      <section
        id="common_author_area"
        className="section_padding"
        style={{
          background: "var(--background-color)",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div
              className="col-lg-8 offset-lg-2"
              style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "0px",
                width: "100%",
              }}
            >
              <div
                className=""
                style={{
                  background: "var(--secondary-color)",
                  borderRadius: "15px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "30px",
                }}
              >
                <h3 style={{ color: "var(--text-color)", fontWeight: "bold" }}>
                  LOGIN
                </h3>

                <div
                  className="common_author_form"
                  style={{ padding: "0px", marginTop: "10px" }}
                >
                  <form onSubmit={handleLogin} id="main_author_form">
                    <div className="form-group">
                      <label
                        style={{
                          textAlign: "left",
                          width: "100%",
                          margin: "10px 0px",
                        }}
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter user name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                          backgroundColor: "var(--background-color)",
                          border: "1px solid var(--secondary-border-color)",
                          padding: "0px 10px",
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label
                        style={{
                          textAlign: "left",
                          width: "100%",
                          margin: "10px 0px",
                        }}
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                          backgroundColor: "var(--background-color)",
                          border: "1px solid var(--secondary-border-color)",
                          padding: "0px 10px",
                        }}
                      />
                      <Link
                        to="/forget-password"
                        style={{
                          fontSize: "14px",
                          color: "var(--dashboard-title-color)",
                        }}
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div
                      className="common_form_submit"
                      style={{ marginTop: "0px", paddingTop: "0px" }}
                    >
                      <button
                        type="submit"
                        className="btn btn_theme btn_md"
                        style={{ width: "100%" }}
                      >
                        Log in
                      </button>
                    </div>
                    <div className="have_acount_area">
                      <p
                        style={{
                          fontSize: "14px",
                          color: "var(--dashboard-title-color)",
                        }}
                      >
                        Don’t have an account?{" "}
                        <Link to="/register">Register now</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer
        toastClassName="custom-toast"
        position="bottom-center"
        autoClose={3000}
      />
    </>
  );
};

export default LoginArea;
