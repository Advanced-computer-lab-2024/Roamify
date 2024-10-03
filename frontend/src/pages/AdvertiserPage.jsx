import React, { useState } from 'react';
import "./AdvertiserPage.css";
import DeleteButton from '../components/Buttons/DeleteButton';
import EditButton from '../components/Buttons/EditButton';
const AdvertisorPage = () => {
    // State to manage the list of activities
    const [activities, setActivities] = useState([]);

    // State to manage the current activity being added or edited
    const [currentActivity, setCurrentActivity] = useState({
        date: '',
        time: '',
        location: '',
        price: '',
        category: '',
        tags: '',
        specialDiscounts: '',
    });

    // State to track whether we are editing an existing activity
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentActivity({ ...currentActivity, [name]: value });
    };

    // Handle add activity
    const handleAddActivity = () => {
        setActivities([...activities, currentActivity]);
        setCurrentActivity({
            date: '',
            time: '',
            location: '',
            price: '',
            category: '',
            tags: '',
            specialDiscounts: '',
        });
    };

    // Handle delete activity
    const handleDeleteActivity = (index) => {
        const updatedActivities = activities.filter((_, i) => i !== index);
        setActivities(updatedActivities);
    };

    // Handle edit activity
    const handleEditActivity = (index) => {
        setIsEditing(true);
        setEditIndex(index);
        setCurrentActivity(activities[index]);
    };

    // Handle update activity
    const handleUpdateActivity = () => {
        const updatedActivities = [...activities];
        updatedActivities[editIndex] = currentActivity;
        setActivities(updatedActivities);
        setIsEditing(false);
        setCurrentActivity({
            date: '',
            time: '',
            location: '',
            price: '',
            category: '',
            tags: '',
            specialDiscounts: '',
        });
    };

    return (
        <div className="advertisor-activities">
            <h1>Manage Activities</h1>
            <div className="activity-form">
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={currentActivity.date}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Time:
                    <input
                        type="time"
                        name="time"
                        value={currentActivity.time}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Location (using Google Maps link):
                    <input
                        type="text"
                        name="location"
                        value={currentActivity.location}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Price (or Price Range):
                    <input
                        type="text"
                        name="price"
                        value={currentActivity.price}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Category:
                    <input
                        type="text"
                        name="category"
                        value={currentActivity.category}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Tags:
                    <input
                        type="text"
                        name="tags"
                        value={currentActivity.tags}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Special Discounts:
                    <input
                        type="text"
                        name="specialDiscounts"
                        value={currentActivity.specialDiscounts}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                {isEditing ? (
                    <button onClick={handleUpdateActivity}>Update Activity</button>
                ) : (
                    <button onClick={handleAddActivity}>Add Activity</button>
                )}
            </div>
            <div className="activity-list">
                <h2>Activities List</h2>
                {activities.length === 0 ? (
                    <p>No activities added yet.</p>
                ) : (
                    <ul>
                        {activities.map((activity, index) => (
                            <li key={index}>
                                <p><strong>Date:</strong> {activity.date}</p>
                                <p><strong>Time:</strong> {activity.time}</p>
                                <p><strong>Location:</strong> <a href={activity.location} target="_blank" rel="noopener noreferrer">{activity.location}</a></p>
                                <p><strong>Price:</strong> {activity.price}</p>
                                <p><strong>Category:</strong> {activity.category}</p>
                                <p><strong>Tags:</strong> {activity.tags}</p>
                                <p><strong>Special Discounts:</strong> {activity.specialDiscounts}</p>
                                <EditButton onClick={() => handleEditActivity(index)}>Edit</EditButton>
                                <DeleteButton onClick={() => handleDeleteActivity(index)}>Delete</DeleteButton>
                                <hr />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AdvertisorPage;
