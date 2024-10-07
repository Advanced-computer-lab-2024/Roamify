import React, { useState, useEffect } from 'react';
import UpdateButton from '../Buttons/UpdateButton'; // Import the UpdateButton component
import EditButton from '../Buttons/EditButton'; // Import the EditButton component
import DeleteButton from '../Buttons/DeleteButton'; // Import the DeleteButton component
import InputField from '../Modals/InputField'; // Import the InputField component
import './AdvertiserPage.css'; // Import main CSS for styling

const EditAdvertiserActivity = () => {
    const [activity, setActivity] = useState({
        date: '',
        time: '',
        location: '',
        price: '',
        category: '',
        tags: '',
        specialDiscounts: '',
    });

    const [isEditing, setIsEditing] = useState(false);

    // Simulate fetching existing activity data from an API or local storage
    useEffect(() => {
        const fetchActivity = async () => {
            const fetchedData = {
                date: '2024-10-06',
                time: '14:00',
                location: 'New York City',
                price: '100 - 200',
                category: 'Food Festival',
                tags: 'Food,Fun,Family',
                specialDiscounts: '10% off for kids',
            };
            setActivity(fetchedData);
        };

        fetchActivity();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActivity({
            ...activity,
            [name]: value,
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        // Logic to handle updating activity, such as sending updated data to the backend
        console.log('Updated Activity:', activity);
        setIsEditing(false);
    };

    const handleDelete = () => {
        // Logic to handle deleting the activity, such as sending a delete request to the backend
        console.log('Activity Deleted:', activity);
    };

    return (
        <div className="edit-advertiser-activity max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-6">Edit Activity</h2>
            <form onSubmit={handleUpdate}>
                <InputField
                    label="Date"
                    type="date"
                    name="date"
                    value={activity.date}
                    onChange={handleChange}
                    required
                    disabled={!isEditing}
                />
                <InputField
                    label="Time"
                    type="time"
                    name="time"
                    value={activity.time}
                    onChange={handleChange}
                    required
                    disabled={!isEditing}
                />
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                    </label>
                    {/* Placeholder for Google Maps input */}
                    <input
                        type="text"
                        name="location"
                        value={activity.location}
                        onChange={handleChange}
                        placeholder="Enter location or select on map"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                        disabled={!isEditing}
                    />
                    {/* You can integrate Google Maps API or any Map component here */}
                </div>
                <InputField
                    label="Price (or Price Range)"
                    type="text"
                    name="price"
                    value={activity.price}
                    onChange={handleChange}
                    required
                    disabled={!isEditing}
                />
                <InputField
                    label="Category"
                    type="text"
                    name="category"
                    value={activity.category}
                    onChange={handleChange}
                    required
                    disabled={!isEditing}
                />
                <InputField
                    label="Tags"
                    type="text"
                    name="tags"
                    value={activity.tags}
                    onChange={handleChange}
                    placeholder="Enter tags separated by commas"
                    disabled={!isEditing}
                />
                <InputField
                    label="Special Discounts"
                    type="text"
                    name="specialDiscounts"
                    value={activity.specialDiscounts}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
                <div className="mt-6 flex justify-between">
                    {!isEditing ? (
                        <EditButton onClick={handleEdit}>Edit Activity</EditButton>
                    ) : (
                        <UpdateButton type="submit">Update Activity</UpdateButton>
                    )}
                    <DeleteButton onClick={handleDelete}>Delete Activity</DeleteButton>
                </div>
            </form>
        </div>
    );
};

export default EditAdvertiserActivity;
