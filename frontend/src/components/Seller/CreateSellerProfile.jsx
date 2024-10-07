import React, { useState } from 'react';
import SubmitButton from '../Buttons/SubmitButton'; // Import the SubmitButton component
import { useParams } from 'react-router-dom'; // Import useParams for URL parameters
import InputField from '../Modals/InputField'; // Import the InputField component
import axios from 'axios'; // Import axios for API calls
import '../TourGuide/TourGuideProfile.css'; // Import main CSS for styling

const CreateSellerProfile = () => {
    const { id: userId } = useParams(); // Extract userId from URL parameters

    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        description: '',
    });

    // Handle input changes
    const handleInputChange = (name, value) => {
        setProfile({ ...profile, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(profile);
        try {
            const userRequest = await axios.post(`http://localhost:3000/seller/create-profile/${userId}`, {
                fName: profile.firstName,
                lName: profile.lastName,
                description: profile.description,
            });
            console.log('Seller Profile Created:', profile);
            console.log(userRequest.data);
        } catch (error) {
            console.log(error);
        }

        // Reset the form
        setProfile({
            firstName: '',
            lastName: '',
            description: '',
        });
    };

    return (
        <div className="create-seller-profile flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-5">Create Seller Profile</h1>
            <form
                className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md"
                onSubmit={handleSubmit}
            >
                {/* First Name */}
                <InputField
                    label="First Name"
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleInputChange}
                    required
                />

                {/* Last Name */}
                <InputField
                    label="Last Name"
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleInputChange}
                    required
                />

                {/* Description */}
                <InputField
                    label="Description"
                    type="textarea"
                    name="description"
                    value={profile.description}
                    onChange={handleInputChange}
                    rows="4"
                    required
                />

                {/* Submit Button */}
                <SubmitButton type="submit">Create Profile</SubmitButton>
            </form>
        </div>
    );
};

export default CreateSellerProfile;
