import React, { useState } from 'react';
import './AdvertiserProfile.css';

const API_URL = "https://your-backend-api.com/profiles"; // Replace with your actual API URL

const AdvertisorProfile = () => {
    // State to manage profile information
    const [profile, setProfile] = useState({
        companyName: '',
        website: '',
        hotline: '',
        companyProfile: '',
    });

    // State to track if the profile is being edited
    const [isEditing, setIsEditing] = useState(true); // Initially true for creating or editing profile

    // Fetch profile from the API on component mount
    useEffect(() => {
        fetchProfile();
    }, []);

    // Fetch the profile from the API
    const fetchProfile = async () => {
        try {
            const response = await fetch(`${API_URL}/1`); // Replace '1' with dynamic user ID or token
            const data = await response.json();
            if (data) {
                setProfile(data);
                setIsEditing(false); // Assume we fetched an existing profile, so no need for editing initially
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

    // Save profile (for both create and update)
    const handleSaveProfile = async () => {
        try {
            if (isEditing) {
                // Update profile if it's already created (PUT request)
                const response = await fetch(`${API_URL}/1`, {  // Replace '1' with dynamic user ID
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(profile),
                });
                if (response.ok) {
                    const updatedProfile = await response.json();
                    setProfile(updatedProfile);
                    setIsEditing(false);
                    console.log('Profile updated:', updatedProfile);
                }
            } else {
                // Create profile if not already created (POST request)
                const response = await fetch(`${API_URL}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(profile),
                });
                if (response.ok) {
                    const newProfile = await response.json();
                    setProfile(newProfile);
                    setIsEditing(false);
                    console.log('Profile created:', newProfile);
                }
            }
        } catch (error) {
            console.error('Error saving profile:', error);
        }
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
