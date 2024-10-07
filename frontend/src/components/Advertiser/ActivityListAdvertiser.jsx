import React, { useState, useEffect } from 'react';
import EditButton from '../Buttons/EditButton'; // Import the EditButton component
import DeleteButton from '../Buttons/DeleteButton'; // Import the DeleteButton component
import './AdvertiserPage.css'; // Import main CSS for styling
import axios from 'axios';
import EditActivityModal from '../Modals/EditActivityModal'; // Import the EditActivityModal component
const profileId = localStorage.getItem('profileId');


const ActivityListAdvertiser = () => {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch the list of activities when the component mounts
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/advertiser/get-my-activities/${profileId}`);
                console.log("API Response:", response.data); // Log response for debugging
                setActivities(response.data);
            } catch (err) {
                console.error("Error fetching activities:", err.message);
            }
        };

        fetchActivities();
    }, []);

    // Handle delete activity
    const handleDelete = async (activityId) => {
        try {
            await axios.delete(`http://localhost:3000/advertiser/delete-activity/${profileId}/${activityId}`);
            setActivities((prev) => prev.filter((activity) => activity._id !== activityId));
        } catch (err) {
            console.error("Error deleting activity:", err.message);
        }
    };

    // Handle edit activity (open modal)
    const handleEdit = (activity) => {
        setSelectedActivity(activity);
        setIsEditing(true);
    };

    // Handle update activity
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            if (selectedActivity) {
                await axios.put(`http://localhost:3000/advertiser/edit-activity/${profileId}/${selectedActivity._id}`, selectedActivity);
                console.log('Updated Activity:', selectedActivity);
                setIsEditing(false);
                // Refresh the activities list
                const response = await axios.get(`http://localhost:3000/advertiser/get-my-activities/${profileId}`);
                setActivities(response.data);
            }
        } catch (error) {
            console.error('Error updating activity:', error.message);
        }
    };

    // Handle input changes for the selected activity in the modal
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedActivity((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="activity-list-page flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-5">My Created Activities</h1>
            <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                {activities.length === 0 ? (
                    <p className="text-center">No activities created yet.</p>
                ) : (
                    <ul className="activity-list">
                        {activities.map((activity) => (
                            <li key={activity._id} className="flex justify-between items-center p-4 border-b border-gray-300">
                                <div>
                                    <h3 className="font-semibold text-lg">{activity.name}</h3>
                                    <p>Location: {activity.location?.coordinates?.[0]}, {activity.location?.coordinates?.[1]}</p>
                                    <p>Date: {new Date(activity.date).toLocaleDateString()}</p>
                                    <p>Time: {activity.time}</p>
                                    <p>Price: {activity.price}</p>
                                    <p>Category: {activity.category?.name}</p>
                                    <p>Tags: {activity.tags?.map(tag => tag.name).join(", ")}</p>
                                    <p>Created By: {activity.advertiser?.name}</p>
                                </div>
                                <div className="flex gap-2">
                                    <EditButton onClick={() => handleEdit(activity)}>Edit</EditButton>
                                    <DeleteButton onClick={() => handleDelete(activity._id)}>Delete</DeleteButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Render the EditActivityModal if editing */}
            {isEditing && selectedActivity && (
                <EditActivityModal
                    activity={selectedActivity}
                    onChange={handleChange}
                    onUpdate={handleUpdate}
                    onClose={() => setIsEditing(false)}
                />
            )}
        </div>
    );
};

export default ActivityListAdvertiser;
