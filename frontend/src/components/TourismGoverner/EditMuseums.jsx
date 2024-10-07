import React, { useState, useEffect } from 'react';
import UpdateButton from '../Buttons/UpdateButton'; // Import the UpdateButton component
import EditButton from '../Buttons/EditButton'; // Import the EditButton component
import DeleteButton from '../Buttons/DeleteButton'; // Import the DeleteButton component
import InputField from '../Modals/InputField'; // Import the InputField component
import './TourismGovernerPage.css'; // Import main CSS for styling

const EditMuseums = () => {
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

    const [isEditing, setIsEditing] = useState(false);

    // Fetch the existing museum details when the component mounts
    useEffect(() => {
        // Simulate fetching data from an API
        const fetchMuseum = async () => {
            // Placeholder data - replace with actual API call
            const fetchedMuseum = {
                name: 'National History Museum',
                description: 'A museum showcasing the history and culture of the region.',
                picture: null,
                location: 'Downtown City Center',
                openingHours: '9:00 AM - 5:00 PM',
                ticketPrices: {
                    foreigner: '20 USD',
                    native: '10 USD',
                    student: '5 USD',
                },
            };
            setMuseum(fetchedMuseum);
        };

        fetchMuseum();
    }, []);

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

    // Handle form submission to update the museum
    const handleUpdate = () => {
        // Here you can add the code to update the museum in the backend
        console.log('Museum updated:', museum);
        setIsEditing(false);
    };

    // Handle deletion of the museum
    const handleDelete = () => {
        // Here you can add the code to delete the museum from the backend
        console.log('Museum deleted');
        // Reset the form or navigate away after deletion
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
        <div className="edit-museum flex flex-col items-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold mb-5">Edit Museum or Historical Place</h1>
            <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                {/* Name */}
                <InputField
                    label="Name"
                    type="text"
                    name="name"
                    value={museum.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />

                {/* Description */}
                <InputField
                    label="Description"
                    type="textarea"
                    name="description"
                    value={museum.description}
                    onChange={handleInputChange}
                    rows="4"
                    disabled={!isEditing}
                />

                {/* Picture */}
                <label className="flex flex-col">
                    Picture:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="p-2 border rounded-md mt-1"
                        disabled={!isEditing}
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
                    disabled={!isEditing}
                />

                {/* Opening Hours */}
                <InputField
                    label="Opening Hours"
                    type="text"
                    name="openingHours"
                    value={museum.openingHours}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />

                {/* Ticket Prices */}
                <h3 className="font-semibold mt-4">Ticket Prices</h3>
                <InputField
                    label="Foreigner"
                    type="text"
                    name="foreigner"
                    value={museum.ticketPrices.foreigner}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />
                <InputField
                    label="Native"
                    type="text"
                    name="native"
                    value={museum.ticketPrices.native}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />
                <InputField
                    label="Student"
                    type="text"
                    name="student"
                    value={museum.ticketPrices.student}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-5">
                    {isEditing ? (
                        <>
                            <UpdateButton onClick={handleUpdate}>Update Museum</UpdateButton>
                            <DeleteButton onClick={handleDelete}>Delete Museum</DeleteButton>
                        </>
                    ) : (
                        <EditButton onClick={() => setIsEditing(true)}>Edit Museum</EditButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditMuseums;
