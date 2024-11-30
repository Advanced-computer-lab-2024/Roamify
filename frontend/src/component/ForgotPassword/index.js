import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios

const ForgotPasswordArea = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle submit for sending OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Make API call using axios
      const response = await axios.post(
        "http://localhost:3000/api/reset-password/send-otp",
        {
          email: email,
        }
      );

      if (response.status === 200) {
        // Successfully sent OTP, redirect to OTP page
        window.location.href = "/otp-page"; // Redirect to OTP page
      } else {
        // Handle unexpected responses (non-200 status)
        setError("Something went wrong. Please try again.");
      }
    } catch (error) {
      // Handle axios error
      if (error.response) {
        // If the error has a response, use the error message from the API
        setError(
          error.response.data.message || "Failed to send OTP. Please try again."
        );
      } else {
        // If the error doesn't have a response (e.g., network error)
        setError("Failed to send OTP. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="common_author_area" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="common_author_boxed">
                <div className="common_author_heading">
                  <h3>Forgot password?</h3>
                </div>
                <div className="common_author_form">
                  <form id="main_author_form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                    </div>
                    {error && (
                      <div style={{ color: "red", marginBottom: "10px" }}>
                        {error}
                      </div>
                    )}
                    <div className="common_form_submit">
                      <button
                        type="submit"
                        className="btn btn_theme btn_md"
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Send code"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPasswordArea;
