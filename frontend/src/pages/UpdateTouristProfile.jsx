import React, { useState, useEffect } from "react";
import UpdateButton from "../components/Buttons/UpdateButton"; // Import the UpdateButton component
import EditButton from "../components/Buttons/EditButton"; // Import the EditButton component
import InputField from "../components/Modals/InputField"; // Import the InputField component
import "../components/TourGuide/TourGuideProfile.css"; // Import main CSS for styling
import axios from "axios";

const UpdateTouristProfile = () => {
  const profileId = localStorage.getItem('profileId');
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    nationality: '',
    dateOfBirth: '',
    occupation: '',
    wallet: '',
    cardNumber: '',            // Add cardNumber field
    availableBalance: '',       // Add availableBalance field
    validUntil: ''              // Add validUntil field
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch the existing tourist profile when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileId) {
        console.error('Profile ID is missing from localStorage');
        return;
      }

      try {
        const result = await axios.get(http://localhost:3000/tourist/get-profile/${profileId});
        console.log('Fetched data:', result.data);
        

        const fetchedProfile = {
          firstName: result.data.fName || '',
          lastName: result.data.lName || '',
          mobileNumber: result.data.mobileNumber || '',
          nationality: result.data.nationality || '',
          dateOfBirth: result.data.dateofBirth ? new Date(result.data.dateofBirth).toISOString().split('T')[0] : '',
          occupation: result.data.occupation || '',
          cardNumber: result.data.cardNumber || '',              // Fetch cardNumber
          availableBalance: result.data.availableBalance || '',  // Fetch availableBalance
          cardValidUntil: result.data.cardValidUntil ? new Date(result.data.validUntil).toISOString().split('T')[0] : '' // Fetch validUntil and format the date
        };
        setProfile(fetchedProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
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
        http://localhost:3000/tourist/update-profile/${profileId},
        {
          fName: profile.firstName,
          lName: profile.lastName,
          mobileNumber: profile.mobileNumber,
          nationality: profile.nationality,
          dateofBirth: profile.dateOfBirth,
          occupation: profile.occupation,
          wallet: profile.wallet,
          cardNumber: profile.cardNumber,                // Add cardNumber to the request    // Add availableBalance to the request
          cardValidUntil: profile.validUntil                 // Add validUntil to the request
        }
      );
      console.log("Profile updated:", request);
      setIsEditing(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="update-tourist-profile flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-5">Edit Tourist Profile</h1>
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

        {/* Mobile Number */}
        <InputField
          label="Mobile Number"
          type="text"
          name="mobileNumber"
          value={profile.mobileNumber}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        {/* Nationality */}
        <InputField
          label="Nationality"
          type="text"
          name="nationality"
          value={profile.nationality}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        {/* Date of Birth */}
        <InputField
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={profile.dateOfBirth}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        {/* Occupation */}
        <InputField
          label="Occupation"
          type="text"
          name="occupation"
          value={profile.occupation}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        {/* Wallet */}
      

        {/* Card Number */}
        <InputField
          label="Card Number"
          type="text"
          name="cardNumber"
          value={profile.cardNumber}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        {/* Available Balance */}
        <InputField
          label="Available Balance"
          type="number"
          name="availableBalance"
          value={profile.availableBalance}
          onChange={handleInputChange}
          disabled='true'
          min="0"
        />

        {/* Valid Until */}
        <InputField
          label="Valid Until"
          type="date"
          name="validUntil"
          value={profile.validUntil}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          {isEditing ? (
            <UpdateButton onClick={handleUpdate}>Update Profile</UpdateButton>
          ) : (
            <EditButton onClick={() => setIsEditing(true)}>Edit Profile</EditButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateTouristProfile;