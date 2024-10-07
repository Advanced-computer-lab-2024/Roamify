import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '../components/Buttons/SubmitButton'; // Import the SubmitButton component
import InputField from '../components/Modals/InputField'; // Import the InputField component
import axios from 'axios';


const SignUpPage = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        email: '',
        username: '',
        password: '',
        userType: '',
        fName: '',
        lName: '',
        mobileNumber: '',
        nationality: '',
        dob: '',
        job: '',
    });

    const [showPopup, setShowPopup] = useState(false);

    // Handle input changes
    const handleInputChange = (name, value) => {
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create user
            const userResponse = await axios.post("http://localhost:3000/user/create-user", {
                username: userDetails.username,
                email: userDetails.email,
                password: userDetails.password,
                role: userDetails.userType
            });
        
            // Get user ID from response
            const userId = userResponse.data.user._id;
            console.log("User ID:", userId);
        
            // Create tourist profile if userType is 'tourist'
            if (userDetails.userType === 'tourist') {
                const profileResponse = await axios.post(`http://localhost:3000/tourist/create-profile/${userId}`, {
                    fName: userDetails.fName,
                    lName: userDetails.lName,
                    mobileNumber: userDetails.mobileNumber,
                    nationality: userDetails.nationality,
                    dateofBirth: userDetails.dob,
                    occupation: userDetails.job
                });
                console.log("Profile created:", profileResponse.data);
        
                // Redirect to login page for Tourist
                navigate('/login');
            } else {
                // Show popup for other user types
                setShowPopup(true);
            }
        
            // Reset the form only after successful registration
            setUserDetails({
                email: '',
                username: '',
                password: '',
                userType: '',
                fName: '',
                lName: '',
                mobileNumber: '',
                nationality: '',
                dob: '',
                job: '',
            });
        
        } catch (error) {
            console.error("Error during user registration or profile creation:", error.response?.data?.message || error.message);
        }
        
    };

    // Handle closing the popup
    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="signup-page flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-5">Sign Up</h1>
            <form
                className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md"
                onSubmit={handleSubmit}
            >
                {/* Email */}
                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    required
                />

                {/* Username */}
                <InputField
                    label="Username"
                    type="text"
                    name="username"
                    value={userDetails.username}
                    onChange={handleInputChange}
                    required
                />

                {/* Password */}
                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={userDetails.password}
                    onChange={handleInputChange}
                    required
                />

                {/* User Type Dropdown */}
                <label className="flex flex-col">
                    User Type:
                    <select
                        name="userType"
                        value={userDetails.userType}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                        className="p-2 border rounded-md mt-1"
                        required
                    >
                        <option value="">Select User Type</option>
                        <option value="tourist">Tourist</option>
                        <option value="tourGuide">Tour Guide</option>
                        <option value="advertiser">Advertiser</option>
                        <option value="seller">Seller</option>
                    </select>
                </label>

                {/* Additional Fields for Tourist */}
                {userDetails.userType === 'tourist' && (
                    <>
                        <InputField
                            label="First Name"
                            type="text"
                            name="fName"
                            value={userDetails.fName}
                            onChange={handleInputChange}
                            required
                        />
                        <InputField
                            label="Last Name"
                            type="text"
                            name="lName"
                            value={userDetails.lName}
                            onChange={handleInputChange}
                            required
                        />

                        <InputField
                            label="Mobile Number"
                            type="text"
                            name="mobileNumber"
                            value={userDetails.mobileNumber}
                            onChange={handleInputChange}
                            required
                        />
                        <InputField
                            label="Nationality"
                            type="text"
                            name="nationality"
                            value={userDetails.nationality}
                            onChange={handleInputChange}
                            required
                        />
                        <InputField
                            label="Date of Birth"
                            type="date"
                            name="dob"
                            value={userDetails.dob}
                            onChange={handleInputChange}
                            required
                        />
                        {/* Job / Student Dropdown */}
        <label className="flex flex-col">
            Job / Student:
            <select
                name="job"
                value={userDetails.job}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                className="p-2 border rounded-md mt-1"
                required
            >
                <option value="">Select occupation</option>
                <option value="student">Student</option>
                <option value="employee">Employee</option>
            </select>
        </label>
                    </>
                )}

                {/* Submit Button */}
                <SubmitButton type="submit">Sign Up</SubmitButton>
            </form>

            {/* Popup for admin acceptance */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content bg-white p-5 rounded-lg shadow-md">
                        <p className="text-lg">
                            Your registration has been received. Please wait for admin acceptance.
                        </p>
                        <button
                            className="close-popup-btn p-2 mt-3 bg-blue-500 text-white rounded-md"
                            onClick={closePopup}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUpPage;
