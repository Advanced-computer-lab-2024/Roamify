import React, { useState } from 'react';

const TourGuideProfile = () => {
    // State to manage profile information
    const [profile, setProfile] = useState({
        name: '',
        mobileNumber: '',
        yearsOfExperience: '',
        previousWork: '',
    });

    // State to track if the profile is being edited
    const [isEditing, setIsEditing] = useState(true); // Initially true for creating a profile

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    // Save profile (for both create and update)
    const handleSaveProfile = () => {
        setIsEditing(false);
        // In a real application, here you would send the data to the server
        console.log('Profile saved:', profile);
    };

    // Enable editing the profile
    const handleEditProfile = () => {
        setIsEditing(true);
    };

    return (
        <div className="tour-guide-profile">
            <h1>Tour Guide Profile</h1>
            {isEditing ? (
                <div className="profile-form">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Mobile Number:
                        <input
                            type="text"
                            name="mobileNumber"
                            value={profile.mobileNumber}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Years of Experience:
                        <input
                            type="number"
                            name="yearsOfExperience"
                            value={profile.yearsOfExperience}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Previous Work:
                        <textarea
                            name="previousWork"
                            value={profile.previousWork}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <button onClick={handleSaveProfile}>Save Profile</button>
                </div>
            ) : (
                <div className="profile-details">
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Mobile Number:</strong> {profile.mobileNumber}</p>
                    <p><strong>Years of Experience:</strong> {profile.yearsOfExperience}</p>
                    <p><strong>Previous Work:</strong> {profile.previousWork}</p>
                    <button onClick={handleEditProfile}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default TourGuideProfile;
