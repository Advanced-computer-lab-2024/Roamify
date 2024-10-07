import React, { useState } from 'react';
import SubmitButton from '../Buttons/SubmitButton'; // Import the SubmitButton component
import InputField from '../Modals/InputField'; // Import the newly created InputField component
import { useParams } from 'react-router-dom';

import axios from 'axios'; // Import axios for API calls

import './AdvertiserProfile.css'; // Import main CSS for styling

const CreateAdvertiserProfile = () => {
    const { id: userId } = useParams(); // Extract userId from URL parameters

    const [profile, setProfile] = useState({
        companyName: '',
        website: '',
        hotline: '',
        companyProfile: '',
    });

    const handleInputChange = (name, value) => {
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logic to handle profile creation, such as sending data to the backend
        try {
            const userRequest = await axios.post(`http://localhost:3000/advertiser/create-profile/${userId}`, {
                companyName: profile.companyName,
                websiteLink: profile.website,
                hotline: profile.hotline,
                companyProfile:profile.companyProfile
                
            });
            console.log('advertiser Profile Created:', profile);
            console.log(userRequest.data);
        } catch (error) {
            console.log(error);
        }

        console.log('Advertiser Profile:', profile);
    };

    return (
        <div className="create-advertiser-profile max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-6">Create Advertiser Profile</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Company Name"
                    type="text"
                    name="companyName"
                    value={profile.companyName}
                    onChange={handleInputChange}
                    required
                />
                <InputField
                    label="Website"
                    type="url"
                    name="website"
                    value={profile.website}
                    onChange={handleInputChange}
                    required
                />
                <InputField
                    label="Hotline"
                    type="tel"
                    name="hotline"
                    value={profile.hotline}
                    onChange={handleInputChange}
                    required
                />
                <InputField
                    label="Company Profile"
                    type="textarea"
                    name="companyProfile"
                    value={profile.companyProfile}
                    onChange={handleInputChange}
                    required
                />
                <div className="mt-6">
                    <SubmitButton>Create Profile</SubmitButton>
                </div>
            </form>
        </div>
    );
};

export default CreateAdvertiserProfile;
