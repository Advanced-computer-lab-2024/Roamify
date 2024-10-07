import React, { useState } from 'react';
import SubmitButton from '../Buttons/SubmitButton'; // Import the SubmitButton component
import InputField from '../Modals/InputField'; // Import the InputField component
import './TourismGovernerPage.css'; // Import main CSS for styling

const CreateMuseums = () => {
    const [museum, setMuseum] = useState({
        name: '',
        description: '',
        picture: null,
        location: '',
        openingHours: '',
        ticketPrices: {
            foreigner: '',
            native: '',
            student: '',
        },
    });

    // Handle input changes
    const handleInputChange = (name, value) => {
        if (['foreigner', 'native', 'student'].includes(name)) {
            setMuseum((prevMuseum) => ({
                ...prevMuseum,
                ticketPrices: {
                    ...prevMuseum.ticketPrices,
                    [name]: value,
                },
            }));
        } else {
            setMuseum((prevMuseum) => ({
                ...prevMuseum,
                [name]: value,
            }));
        }
    };

    // Handle file change for picture upload
    const handleFileChange = (e) => {
        setMuseum({ ...museum, picture: e.target.files[0] });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add the code to submit the museum to the backend
        console.log('Museum Created:', museum);
        // Reset the form
        setMuseum({
            name: '',
            description: '',
            picture: null,
            location: '',
            openingHours: '',
            ticketPrices: {
                foreigner: '',
                native: '',
                student: '',
            },
        });
    };

    return (
        <div className="create-museum flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-5">Create Museum or Historical Place</h1>
            <form
                className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md"
                onSubmit={handleSubmit}
            >
                {/* Name */}
                <InputField
                    label="Name"
                    type="text"
                    name="name"
                    value={museum.name}
                    onChange={handleInputChange}
                    required
                />

                {/* Description */}
                <InputField
                    label="Description"
                    type="textarea"
                    name="description"
                    value={museum.description}
                    onChange={handleInputChange}
                    rows="4"
                    required
                />

                {/* Picture */}
                <label className="flex flex-col">
                    Picture:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="p-2 border rounded-md mt-1"
                    />
                    {museum.picture && (
                        <img
                            src={URL.createObjectURL(museum.picture)}
                            alt="Museum Preview"
                            className="mt-3 w-32 h-32 object-cover"
                        />
                    )}
                </label>

                {/* Location */}
                <InputField
                    label="Location"
                    type="text"
                    name="location"
                    value={museum.location}
                    onChange={handleInputChange}
                    required
                />

                {/* Opening Hours */}
                <InputField
                    label="Opening Hours"
                    type="text"
                    name="openingHours"
                    value={museum.openingHours}
                    onChange={handleInputChange}
                    required
                />

                {/* Ticket Prices */}
                <h3 className="font-semibold mt-4">Ticket Prices</h3>
                <InputField
                    label="Foreigner"
                    type="text"
                    name="foreigner"
                    value={museum.ticketPrices.foreigner}
                    onChange={handleInputChange}
                    required
                />
                <InputField
                    label="Native"
                    type="text"
                    name="native"
                    value={museum.ticketPrices.native}
                    onChange={handleInputChange}
                    required
                />
                <InputField
                    label="Student"
                    type="text"
                    name="student"
                    value={museum.ticketPrices.student}
                    onChange={handleInputChange}
                    required
                />

                {/* Submit Button */}
                <SubmitButton type="submit">Create Museum</SubmitButton>
            </form>
        </div>
    );
};

export default CreateMuseums;
