import React, { useState } from 'react';
import SubmitButton from '../Buttons/SubmitButton'; // Import the SubmitButton component
import InputField from '../Modals/InputField'; // Import the InputField component
import './AdvertiserPage.css'; // Import main CSS for styling


const CreateAdvertiserActivity = () => {
    const [activity, setActivity] = useState({
        date: '',
        time: '',
        location: '',
        price: '',
        category: '',
        tags: '',
        specialDiscounts: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActivity({
            ...activity,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle activity creation, such as sending data to the backend
        console.log('New Activity:', activity);
    };
    const setLocation = (location) => {
        setActivity((prevActivity) => ({ ...prevActivity, location }));
    };

    return (
        <div className="create-advertiser-activity max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-6">Create New Activity</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Date"
                    type="date"
                    name="date"
                    value={activity.date}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Time"
                    type="time"
                    name="time"
                    value={activity.time}
                    onChange={handleChange}
                    required
                />
                {/* <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                    </label> */}
                    {/* Placeholder for Google Maps input */}
                    {/* <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                    </label>
                    <GoogleMap location={activity.location} setLocation={setLocation} />
                </div> */}
                    {/* You can integrate Google Maps API or any Map component here */}
                {/* </div> */}
                <InputField
                    label="Price (or Price Range)"
                    type="text"
                    name="price"
                    value={activity.price}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Category"
                    type="text"
                    name="category"
                    value={activity.category}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Tags"
                    type="text"
                    name="tags"
                    value={activity.tags}
                    onChange={handleChange}
                    placeholder="Enter tags separated by commas"
                />
                <InputField
                    label="Special Discounts"
                    type="text"
                    name="specialDiscounts"
                    value={activity.specialDiscounts}
                    onChange={handleChange}
                />
                <div className="mt-6">
                    <SubmitButton>Create Activity</SubmitButton>
                </div>
            </form>
        </div>
    );
};

export default CreateAdvertiserActivity;
