import React, { useState, useEffect } from "react";
import UpdateButton from "../Buttons/UpdateButton"; // Import the UpdateButton component
import EditButton from "../Buttons/EditButton"; // Import the EditButton component
import InputField from "../Modals/InputField"; // Import the InputField component
import "./TourGuideProfile.css"; // Import main CSS for styling
import axios from "axios";

const EditTourGuideProfile = () => {
    const profileId = localStorage.getItem('profileId');
    const [profile, setProfile] = useState({ 
        mobileNumber: '',
        yearsOfExperience: '',
        previousWork: '',
        languages: '',
        specialization: '',
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
            const result = await axios.get(`http://localhost:3000/tourguide/get-profile/${profileId}`);
            console.log('Fetched data:', result.data); // Correctly log the fetched data

            const fetchedProfile = {
                mobileNumber: result.data.mobileNumber || '',
                yearsOfExperience: result.data.yearsOfExperience || '',
                previousWork: result.data.previousWork || '',
                languages: result.data.languages || '',
                specialization: result.data.specialization || '',
            };
            setProfile(fetchedProfile);
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                console.error('No response received:', error.request);
            } else {
                // Something else happened
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
    // Here you can add the code to update the profile in the backend
    try {
      const request = await axios.put(
        `http://localhost:3000/tourguide/update-profile/${profileId}`,
        {
            mobileNumber:profile.mobileNumber,
            yearsOfExperience:profile.yearsOfExperience,
            previousWork:profile.previousWork

        }

      );
      console.log("Profile updated:", request);
      setIsEditing(false);
    } catch (e) {
        console.log(e);
    }
  };

  return (
    <div className="edit-tour-guide-profile flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-5">Edit Tour Guide Profile</h1>
      <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* Mobile Number */}
        <InputField
          label="Mobile Number"
          type="text"
          name="mobileNumber"
          value={profile.mobileNumber}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        {/* Years of Experience */}
        <InputField
          label="Years of Experience"
          type="number"
          name="yearsOfExperience"
          value={profile.yearsOfExperience}
          onChange={handleInputChange}
          disabled={!isEditing}
          min="0"
        />

        {/* Previous Work */}
        <InputField
          label="Previous Work"
          type="textarea"
          name="previousWork"
          value={profile.previousWork}
          onChange={handleInputChange}
          disabled={!isEditing}
          rows="3"
        />

        {/* Languages */}
        {/* <InputField
          label="Languages Spoken"
          type="text"
          name="languages"
          value={profile.languages}
          onChange={handleInputChange}
          disabled={!isEditing}
        /> */}

        {/* Specialization */}
        {/* <InputField
          label="Specialization (e.g., Historical Sites, Adventure)"
          type="text"
          name="specialization"
          value={profile.specialization}
          onChange={handleInputChange}
          disabled={!isEditing}
        /> */}

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

export default EditTourGuideProfile;
