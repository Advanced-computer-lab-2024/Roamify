import React, { useState, useEffect } from 'react';
import './TourGuideProfile.css';

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

  // Simulate fetching profile data from an API
  useEffect(() => {
    // Fetch existing profile data from backend (you would use an actual API call here)
    const fetchProfile = async () => {
      const mockProfile = {
        name: 'John Doe',
        mobile: '123-456-7890',
        yearsOfExperience: '5',
        previousWork: 'Worked at XYZ Tours',
        bio: 'I am an experienced tour guide with a passion for history.',
      };
      setProfile(mockProfile);
    };
    fetchProfile();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle profile update
  const handleUpdateProfile = () => {
    setIsEditing(false);
    // You would send the updated profile to the backend here (via API call)
    console.log('Updated profile:', profile);
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

