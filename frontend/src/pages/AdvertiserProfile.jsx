import React, { useState } from 'react';
import './AdvertiserProfile.css';

const AdvertisorProfile = () => {
    // State to manage profile information
    const [profile, setProfile] = useState({
        companyName: '',
        website: '',
        hotline: '',
        companyProfile: '',
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
        <div className="advertisor-profile">
            {isEditing ? (
                <div className="profile-form">
                    <h1>Advertiser Company Profile</h1>
                    <label>
                        Company Name:
                        <input
                            type="text"
                            name="companyName"
                            value={profile.companyName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Website:
                        <input
                            type="url"
                            name="website"
                            value={profile.website}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Hotline:
                        <input
                            type="text"
                            name="hotline"
                            value={profile.hotline}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <label>
                        Company Profile:
                        <textarea
                            name="companyProfile"
                            value={profile.companyProfile}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <button onClick={handleSaveProfile}>Save Profile</button>
                </div>
            ) : (
                <div className="profile-details">
                    <p><strong>Company Name:</strong> {profile.companyName}</p>
                    <p><strong>Website:</strong> <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a></p>
                    <p><strong>Hotline:</strong> {profile.hotline}</p>
                    <p><strong>Company Profile:</strong> {profile.companyProfile}</p>
                    <button onClick={handleEditProfile}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default AdvertisorProfile;
