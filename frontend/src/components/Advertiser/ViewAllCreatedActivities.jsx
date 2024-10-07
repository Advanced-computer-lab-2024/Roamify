import React, { useState, useEffect } from 'react';
import './AdvertiserPage.css'; // Import main CSS for styling
import axios from 'axios';

const ViewAllCreatedActivities = () => {
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);

    // Fetch the list of all activities when the component mounts
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get("http://localhost:3000/advertiser/get-activities");
                console.log("API Response:", response.data); // Log response for debugging

                // Set the activities if the response data is an array
                if (Array.isArray(response.data)) {
                    setActivities(response.data);
                } else {
                    console.warn("Unexpected response structure:", response.data);
                }
            } catch (err) {
                console.error("Error fetching activities:", err.message);
                setError("Failed to fetch activities. Please try again later.");
            }
        };

        fetchActivities();
    }, []); // Correct placement of dependency array

    return (
        <div className="activity-list-page flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-5">All Created Activities</h1>
            <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
                {error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : activities.length === 0 ? (
                    <p className="text-center">No activities available.</p>
                ) : (
                    <ul className="activity-list">
                        {activities.map((activity) => (
                            <li key={activity._id} className="flex justify-between items-center p-4 border-b border-gray-300">
                                <div>
                                    <h3 className="font-semibold text-lg">{activity.name}</h3>
                                    <p>Location: {activity.location?.name || "Location not specified"}</p>
                                    <p>
                                        Coordinates: {activity.location?.coordinates ? `${activity.location.coordinates[0]}, ${activity.location.coordinates[1]}` : "Coordinates not available"}
                                    </p>
                                    <p>Date: {new Date(activity.date).toLocaleDateString()}</p>
                                    <p>Time: {activity.time}</p>
                                    <p>Price: {Array.isArray(activity.price) ? `$${activity.price[0]} - $${activity.price[1]}` : `$${activity.price}`}</p>
                                    <p>Category: {activity.category?.name || "Category not specified"}</p>
                                    <p>Tags: {activity.tags && activity.tags.length > 0 ? activity.tags.map(tag => tag.name).join(", ") : "No tags available"}</p>
                                    <p>Created By: {activity.createdBy?.name || "Advertiser not specified"}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ViewAllCreatedActivities;
