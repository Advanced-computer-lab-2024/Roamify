import React, { useState, useEffect } from 'react';
import './TourGuideProfile.css';

const API_URL = "https://your-backend-api.com/tour-guide-profile"; // Replace with your actual API URL

const TourGuideProfile = () => {
  // State to manage tour guide's profile information
  const [profile, setProfile] = useState({
    name: '',
    mobile: '',
    yearsOfExperience: '',
    previousWork: '',
    bio: '',
  });

  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile data from the backend when the component mounts
  useEffect(() => {
    fetchProfile();
  }, []);

  // Fetch the tour guide profile from the backend
  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/1`); // Replace '1' with the actual tour guide's ID or use auth token
      const data = await response.json();
      if (data) {
        setProfile(data); // Update profile state with fetched data
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle profile update and send it to the backend
  const handleUpdateProfile = async () => {
    setIsEditing(false);
    try {
      const response = await fetch(`${API_URL}/1`, {  // Replace '1' with the actual tour guide's ID or use auth token
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile); // Update the profile in state with the response from the backend
        console.log('Profile updated:', updatedProfile);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };


  return (
    <div className="profile-page">

      {isEditing ? (
        <div className="profile-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={profile.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={profile.mobile}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="yearsOfExperience"
            placeholder="Years of Experience"
            value={profile.yearsOfExperience}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="previousWork"
            placeholder="Previous Work"
            value={profile.previousWork}
            onChange={handleInputChange}
          />
          <textarea
            name="bio"
            placeholder="Bio"
            value={profile.bio}
            onChange={handleInputChange}
          ></textarea>
          <button className="save-button" onClick={handleUpdateProfile}>
            Save Profile
          </button>
        </div>
      ) : (
        <div className="profile-details">
          <h1>Tour Guide Profile</h1>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Mobile:</strong> {profile.mobile}</p>
          <p><strong>Years of Experience:</strong> {profile.yearsOfExperience}</p>
          <p><strong>Previous Work:</strong> {profile.previousWork || 'N/A'}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default TourGuideProfile;

