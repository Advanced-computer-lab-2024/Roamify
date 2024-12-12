import React, { useState } from "react";
import axios from "axios";

const ResetPasswordArea = () => {
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

    // const resetToken = document.cookies.get("resetToken"); // Get the reset token from cookies

    // if (!resetToken) {
    //   setError("Reset token is missing.");
    //   return;
    // }

    try {
      setIsSubmitting(true);
      setError(""); // Clear previous errors

      const response = await axios.post(
        "http://localhost:3000/api/reset-password",
        {
          password,
          confirmedPassword,
          //   token: resetToken,
        },
        {
          withCredentials: true, // Send cookies with the request
        }
      );

      // Handle response
      if (response.data.success) {
        alert("Password has been reset successfully!");
        // Redirect or show success message
      } else {
        setError(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error resetting password", error);
      setError("Error resetting password. Please try again.");
    } finally {
      setIsSubmitting(false);
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
                  <form onSubmit={handleSubmit} id="main_author_form">
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
                      <button
                        type="submit"
                        className="btn btn_theme btn_md"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Reset password"}
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

export default ResetPasswordArea;
