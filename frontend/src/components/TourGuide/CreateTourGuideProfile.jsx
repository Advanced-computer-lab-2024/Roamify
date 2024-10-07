import React, { useState } from 'react';
import SubmitButton from '../Buttons/SubmitButton'; // Import the SubmitButton component
import { useParams } from 'react-router-dom';
import InputField from '../Modals/InputField'; // Import the InputField component
import axios from 'axios'; // Import axios for API calls
import './TourGuideProfile.css'; // Import main CSS for styling

const CreateTourGuideProfile = () => {
    const { id: userId } = useParams(); // Extract userId from URL parameters

    const [profile, setProfile] = useState({
        mobileNumber: '',
        yearsOfExperience: '',
        previousWork: '',
        languages: '',
        specialization: '',
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
            const userRequest = await axios.post(`http://localhost:3000/tourguide/create-profile/${userId}`, {
                mobileNumber: profile.mobileNumber,
                yearsOfExperience: profile.yearsOfExperience,
                previousWork: profile.previousWork,
                
            });
            console.log('Tour Guide Profile Created:', profile);
            console.log(userRequest.data);
        } catch (error) {
            console.log(error);
        }

        // Reset the form
        setProfile({
            mobileNumber: '',
            yearsOfExperience: '',
            previousWork: '',
            languages: '',
            specialization: '',
        });
    };

    return (
        <div className="create-tour-guide-profile flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-5">Create Tour Guide Profile</h1>
            <form
                className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md"
                onSubmit={handleSubmit}
            >
                {/* Mobile Number */}
                <InputField
                    label="Mobile Number"
                    type="text"
                    name="mobileNumber"
                    value={profile.mobileNumber}
                    onChange={handleInputChange}
                    required
                />

                {/* Years of Experience */}
                <InputField
                    label="Years of Experience"
                    type="number"
                    name="yearsOfExperience"
                    value={profile.yearsOfExperience}
                    onChange={handleInputChange}
                    min="0"
                    required
                />

                {/* Previous Work */}
                <InputField
                    label="Previous Work"
                    type="textarea"
                    name="previousWork"
                    value={profile.previousWork}
                    onChange={handleInputChange}
                    rows="3"
                />

                {/* Languages */}
                {/* <InputField
                    label="Languages Spoken"
                    type="text"
                    name="languages"
                    value={profile.languages}
                    onChange={handleInputChange}
                    required
                /> */}

                {/* Specialization */}
                {/* <InputField
                    label="Specialization (e.g., Historical Sites, Adventure)"
                    type="text"
                    name="specialization"
                    value={profile.specialization}
                    onChange={handleInputChange}
                /> */}

                {/* Submit Button */}
                <SubmitButton type="submit">Create Profile</SubmitButton>
            </form>
        </div>
    );
};

export default CreateTourGuideProfile;
