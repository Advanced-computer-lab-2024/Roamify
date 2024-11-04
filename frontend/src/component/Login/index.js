import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginArea = () => {
  // Define state for form input and errors
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Make a POST request to the login API endpoint
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // Handle successful login
      console.log("Login successful:", response.data);
    } catch (err) {
      // Handle errors
      console.error("Error logging in:", err);
      setError("Invalid username or password. Please try again.");
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
                  <h3>Login your account</h3>
                  <h2>Logged in to stay in touch</h2>
                </div>
                <div className="common_author_form">
                  <form onSubmit={handleLogin} id="main_author_form">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter user name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Link to="/forget-password">Forgot password?</Link>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="common_form_submit">
                      <button type="submit" className="btn btn_theme btn_md">
                        Log in
                      </button>
                    </div>
                    <div className="have_acount_area">
                      <p>
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
    </>
  );
};

export default LoginArea;