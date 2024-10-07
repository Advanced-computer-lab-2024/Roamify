import React, { useState, useEffect } from 'react';
import EditButton from '../Buttons/EditButton'; // Import the EditButton component
import DeleteButton from '../Buttons/DeleteButton'; // Import the DeleteButton component
import './AdvertiserPage.css'; // Import main CSS for styling

const ActivityList = () => {
    const [activities, setActivities] = useState([]);

    // Fetch the list of activities when the component mounts
    useEffect(() => {
        const fetchActivities = async () => {
            // Simulate fetching data from an API
            const fetchedActivities = [
                {
                    id: 1,
                    name: 'Advertiser Promotion Event',
                    location: 'City Mall',
                    date: '2024-11-20',
                    time: '1:00 PM',
                    price: 'Free',
                    category: 'Promotion',
                    tags: 'Discount, Sale',
                },
                {
                    id: 2,
                    name: 'Product Launch Campaign',
                    location: 'Convention Center',
                    date: '2024-12-05',
                    time: '3:00 PM',
                    price: '10 USD',
                    category: 'Launch Event',
                    tags: 'New Product, Launch',
                },
            ];
            setActivities(fetchedActivities);
        };

        fetchActivities();
    }, []);

    // Handle delete activity
    const handleDelete = (activityId) => {
        // Here you can add the code to delete the activity from the backend
        const updatedActivities = activities.filter((activity) => activity.id !== activityId);
        setActivities(updatedActivities);
        console.log('Activity deleted:', activityId);
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
                            <li key={activity.id} className="flex justify-between items-center p-4 border-b border-gray-300">
                                <div>
                                    <h3 className="font-semibold text-lg">{activity.name}</h3>
                                    <p>Location: {activity.location}</p>
                                    <p>Date: {activity.date}</p>
                                    <p>Time: {activity.time}</p>
                                    <p>Price: {activity.price}</p>
                                    <p>Category: {activity.category}</p>
                                    <p>Tags: {activity.tags}</p>
                                </div>
                                <div className="flex gap-2">
                                    <EditButton>Edit</EditButton>
                                    <DeleteButton onClick={() => handleDelete(activity.id)}>Delete</DeleteButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ActivityList;
