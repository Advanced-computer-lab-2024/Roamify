import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    navigate("/admin");
    console.log("Logging in with:", email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="w-full max-w-md p-8 space-y-8 bg-secondary rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-primary">Login</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email/Username Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-primary"
            >
              Email or Username
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
