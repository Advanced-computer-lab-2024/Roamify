import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import SubmitButton from '../Buttons/SubmitButton'; // Import the SubmitButton component
import InputField from '../Modals/InputField'; // Import the InputField component
import './TourismGovernerPage.css'; // Import main CSS for styling
const profileId = localStorage.getItem('profileId');


const CreateMuseums = () => {
    const [museum, setMuseum] = useState({
        type: 'museum', // Default type
        name: '',
        description: '',
        picture: '',
        location: {
            type: 'Point',
            coordinates: ['', ''], // [longitude, latitude]
        },
        openingHours: '',
        ticketPrice: {
            foreigner: '',
            Native: '',
            student: '',
        },
    });

    // Handle input changes
    const handleChange = (e) => {
        if (e && e.target) {
            const { name, value } = e.target;

            // Handle nested fields for ticketPrice and location coordinates
            if (['foreigner', 'Native', 'student'].includes(name)) {
                setMuseum((prevMuseum) => ({
                    ...prevMuseum,
                    ticketPrice: {
                        ...prevMuseum.ticketPrice,
                        [name]: Number(value),
                    },
                }));
            } else if (name.startsWith('coordinates')) {
                const index = name.split(' ')[1] === 'longitude' ? 0 : 1;
                setMuseum((prevMuseum) => ({
                    ...prevMuseum,
                    location: {
                        ...prevMuseum.location,
                        coordinates: prevMuseum.location.coordinates.map((coord, idx) =>
                            idx === index ? Number(value) : coord
                        ),
                    },
                }));
            } else {
                setMuseum((prevMuseum) => ({
                    ...prevMuseum,
                    [name]: value,
                }));
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make POST request to create a new place
            const response = await axios.post(
                `http://localhost:3000/tourism-governor/create-place/${profileId}`,
                museum
            );
            console.log('Place Created:', response.data);
            // Reset the form after successful submission
            setMuseum({
                type: 'museum',
                name: '',
                description: '',
                picture: '',
                location: {
                    type: 'Point',
                    coordinates: ['', ''],
                },
                ticketPrice: {
                    foreigner: '',
                    Native: '',
                    student: '',
                },
            });
        } catch (error) {
            console.error('Error creating place:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="create-museum flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-5">Create Museum or Historical Place</h1>
            <form
                className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md"
                onSubmit={handleSubmit}
            >
                {/* Type Dropdown */}
                <label className="flex flex-col">
                    Type:
                    <select
                        name="type"
                        value={museum.type}
                        onChange={handleChange}
                        className="p-2 border rounded-md mt-1"
                        required
                    >
                        <option value="museum">Museum</option>
                        <option value="historical_site">Historical Site</option>
                    </select>
                </label>

                {/* Name */}
                <InputField
                    label="Name"
                    type="text"
                    name="name"
                    value={museum.name}
                    onChange={handleChange}
                    required
                />

                {/* Description */}
                <InputField
                    label="Description"
                    type="textarea"
                    name="description"
                    value={museum.description}
                    onChange={handleChange}
                    rows="4"
                    required
                />

                {/* Picture */}
                <label className="flex flex-col">
                    Picture (URL):
                    <input
                        type="text"
                        name="picture"
                        value={museum.picture}
                        onChange={handleChange}
                        placeholder="Enter picture URL"
                        className="p-2 border rounded-md mt-1"
                    />
                </label>

                {/* Location Coordinates */}
                <h3 className="font-semibold mt-4">Location Coordinates</h3>
                <InputField
                    label="Longitude"
                    type="number"
                    name="coordinates longitude"
                    value={museum.location.coordinates[0]}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Latitude"
                    type="number"
                    name="coordinates latitude"
                    value={museum.location.coordinates[1]}
                    onChange={handleChange}
                    required
                />

                {/* Ticket Prices */}
                <h3 className="font-semibold mt-4">Ticket Prices</h3>
                <InputField
                    label="Foreigner Price"
                    type="number"
                    name="foreigner"
                    value={museum.ticketPrice.foreigner}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Native Price"
                    type="number"
                    name="Native"
                    value={museum.ticketPrice.Native}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Student Price"
                    type="number"
                    name="student"
                    value={museum.ticketPrice.student}
                    onChange={handleChange}
                    required
                />

                {/* Submit Button */}
                <SubmitButton type="submit">Create Place</SubmitButton>
            </form>
        </div>
    );
};

export default CreateMuseums;
