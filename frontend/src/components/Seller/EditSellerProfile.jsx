import React, { useState, useEffect } from "react";
import UpdateButton from "../Buttons/UpdateButton"; // Import the UpdateButton component
import EditButton from "../Buttons/EditButton"; // Import the EditButton component
import InputField from "../Modals/InputField"; // Import the InputField component

import axios from "axios";
import '../TourGuide/TourGuideProfile.css'; // Import main CSS for styling


const EditSellerProfile = () => {

    const profileId = localStorage.getItem('profileId');
    const [profile, setProfile] = useState({ 
        firstName: '',
        lastName: '',
        description: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    // Fetch the existing profile when the component mounts
    useEffect(() => {
        const fetchProfile = async () => {
            if (!profileId) {
                console.error('Profile ID is missing from localStorage');
                return;
            }

            try {
                const result = await axios.get(`http://localhost:3000/seller/get-profile/${profileId}`);
                console.log('Fetched data:', result.data); // Correctly log the fetched data

                const fetchedProfile = {
                    firstName: result.data.fName || '',
                    lastName: result.data.lName || '',
                    description: result.data.description || '',
                };
                setProfile(fetchedProfile);
            } catch (error) {
                if (error.response) {
                    console.error('Error response:', error.response.data);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error setting up request:', error.message);
                }
            }
        };

        fetchProfile();
    }, [profileId]);

    // Handle input changes
    const handleInputChange = (name, value) => {
        setProfile({ ...profile, [name]: value });
    };

    // Handle form submission to update the profile
    const handleUpdate = async () => {
        try {
            const request = await axios.put(
                `http://localhost:3000/seller/update-profile/${profileId}`,
                {
                    fName: profile.firstName,
                    lName: profile.lastName,
                    description: profile.description,
                }
            );
            console.log("Profile updated:", request);
            setIsEditing(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="edit-seller-profile flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-5">Edit Seller Profile</h1>
            <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                {/* First Name */}
                <InputField
                    label="First Name"
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />

                {/* Last Name */}
                <InputField
                    label="Last Name"
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />

                {/* Description */}
                <InputField
                    label="Description"
                    type="textarea"
                    name="description"
                    value={profile.description}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows="3"
                />

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-5">
                    {isEditing ? (
                        <UpdateButton onClick={handleUpdate}>Update Profile</UpdateButton>
                    ) : (
                        <EditButton onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </EditButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditSellerProfile;
