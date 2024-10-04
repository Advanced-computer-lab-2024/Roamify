import React, { useState } from 'react';
import "./AdvertiserPage.css";
import DeleteButton from '../components/Buttons/DeleteButton';
import EditButton from '../components/Buttons/EditButton';
import AddActivityButton from '../components/Buttons/AddActivityButton';
import UpdateButton from '../components/Buttons/UpdateButton';

const API_URL = "https://your-backend-api.com/activities"; // Replace with your actual API URL

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

    // Fetch activities from the API on component mount
    useEffect(() => {
        fetchActivities();
    }, []);

    // Fetch all activities from the backend API
    const fetchActivities = async () => {
        try {
            const response = await fetch(`${API_URL}`);
            const data = await response.json();
            setActivities(data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentActivity({ ...currentActivity, [name]: value });
    };

    // Handle add activity (POST request to the backend)
    const handleAddActivity = async () => {
        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentActivity),
            });
            const newActivity = await response.json();
            setActivities([...activities, newActivity]);
            resetActivityForm();
        } catch (error) {
            console.error('Error adding activity:', error);
        }
    };

    // Handle delete activity (DELETE request to the backend)
    const handleDeleteActivity = async (index) => {
        const activityToDelete = activities[index];
        try {
            await fetch(`${API_URL}/${activityToDelete.id}`, {
                method: 'DELETE',
            });
            const updatedActivities = activities.filter((_, i) => i !== index);
            setActivities(updatedActivities);
        } catch (error) {
            console.error('Error deleting activity:', error);
        }
    };

    // Handle edit activity
    const handleEditActivity = (index) => {
        setIsEditing(true);
        setEditIndex(index);
        setCurrentActivity(activities[index]);
    };

    // Handle update activity (PUT request to the backend)
    const handleUpdateActivity = async () => {
        const activityToUpdate = activities[editIndex];
        try {
            const response = await fetch(`${API_URL}/${activityToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentActivity),
            });
            const updatedActivity = await response.json();
            const updatedActivities = [...activities];
            updatedActivities[editIndex] = updatedActivity;
            setActivities(updatedActivities);
            resetActivityForm();
        } catch (error) {
            console.error('Error updating activity:', error);
        }
    };

    // Reset the form after adding or updating
    const resetActivityForm = () => {
        setCurrentActivity({
            date: '',
            time: '',
            location: '',
            price: '',
            category: '',
            tags: '',
            specialDiscounts: '',
        });
        setIsEditing(false);
        setEditIndex(null);
    };

    return (
        <div className="advertisor-activities">
            <div className="activity-form">
               <h1>Manage Activities</h1>
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
                    <UpdateButton onClick={handleUpdateActivity}>Update Activity</UpdateButton>
                ) : (
                    <AddActivityButton onClick={handleAddActivity}></AddActivityButton>
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
                                <EditButton onClick={() => handleEditActivity(index)}></EditButton>
                                <DeleteButton onClick={() => handleDeleteActivity(index)}></DeleteButton>
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
