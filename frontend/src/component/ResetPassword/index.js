import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ResetPasswordArea = () => {
  const navigate = useNavigate(); 
  // State for managing form data and error messages
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (password !== confirmedPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      setIsSubmitting(true);
      setError(""); // Clear previous errors
  
      const response = await axios.post(
        "http://localhost:3000/api/reset-password",
        {
          password,
          confirmedPassword,
          // token: resetToken,
        },
        {
          withCredentials: true, // Send cookies with the request
        }
      );
  
      // Handle response
      if (response.status === 200) { // Check if status code is 200 OK
        alert("Password has been reset successfully!");
        navigate('/login'); // Navigate to orders page
      } 
      else {
        setError(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error resetting password", error);
      setError("Error resetting password. Please try again.");
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
                  <h2>Reset your password</h2>
                </div>
                <div className="common_author_form">
                <form id="main_author_form" onSubmit={handleSubmit}>
                    {error && (
                      <div style={{ color: "red", marginBottom: "15px" }}>
                        {error}
                      </div>
                    )}
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="New password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm password"
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="common_form_submit">
                    <button type="submit" className="btn btn_theme btn_md"> Reset password </button> 
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

export default ResetPasswordArea;