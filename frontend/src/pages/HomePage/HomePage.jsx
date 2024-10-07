import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    // Handle the click event to redirect to the SignUp page
    const handleSignUpClick = () => {
        navigate('/signup');
    };

    // Handle the click event to redirect to the Login page
    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="home-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Sign Up Button */}
            <button
                onClick={handleSignUpClick}
                className="signup-button absolute top-5 right-20 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
                Sign Up
            </button>

            {/* Login Button */}
            <button
                onClick={handleLoginClick}
                className="login-button absolute top-5 right-5 px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
            >
                Login
            </button>

            {/* Main Content Area */}
            <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform!</h1>
            <p className="text-lg text-gray-700 mb-8">
                Explore the platform and enjoy the services we provide.
            </p>
            {/* You can add more content here */}
        </div>
    );
};

export default HomePage;
