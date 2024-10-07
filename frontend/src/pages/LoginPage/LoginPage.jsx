import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log("pressed");
    e.preventDefault();
    axios
      .post("http://localhost:3000/user/login", { username, password })
      .then((result) => {
        // const userId = result.data.user.user.user._id;
        // const profileId = result.user._id;
        console.log(result.data.user.user.role);
        if (
          result.data.user.role === "admin" ||
          result.data.user.role === "tourismGovernor"
        ) {
          const userId = result.data.user._id;
          localStorage.setItem("userId", userId);
        } else {
          const userId = result.data.user.user._id;
          const profileId = result.data.user._id;
          localStorage.setItem("userId", userId);
          localStorage.setItem("profileId", profileId);
        }
        // console.log(result.data.user._id);
        // console.log(result.data.user.user._id);
        // localStorage.setItem("userId", userId);
        // localStorage.setItem("profileId", profileId);
        // localStorage.setItem("parentId", result.user._id);
        // localStorage.setItem("childId", result.user.user._id);
        switch (result.data.user.user.role) {
          case "tourist":
            navigate("/tourist");
            break;
          case "tourGuide":
            navigate("/tour-guide");
            break;
          case "seller":
            navigate("/seller");
            break;
          case "tourism-governor":
            navigate("/tourismGovernor");
            break;
          case "admin":
            navigate("/admin");
            break;
          case "advertiser":
            navigate("/advertiser");
            break;
        }
      })
      .catch((err) => console.log(err.toString()));
  };
  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    navigate("/admin");
    console.log("Logging in with:", username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md p-8 space-y-8 bg-secondary rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-primary">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* username/Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-primary"
            >
              username or Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-primary"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Continue Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-secondary bg-primary rounded-md hover:bg-primaryHover focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
            >
              Login
            </button>
          </div>
        </form>

        {/* Forgot Password and Sign Up Links */}
        <div className="text-sm text-center">
          <a href="#" className="text-primary hover:text-accent">
            Forgot Password?
          </a>
        </div>
        <div className="text-sm text-center">
          <span>Don't have an account? </span>
          <a href="#" className="text-primary hover:text-accent">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
