import React, { useState } from 'react';

const TourismGovernorPage = () => {
    // State to manage the list of museums and historical places
    const [places, setPlaces] = useState([]);

    // State to manage the current place being added or edited
    const [currentPlace, setCurrentPlace] = useState({
        name: '',
        description: '',
        pictures: null, // Store the file directly
        location: '',
        openingHours: '',
        ticketPrices: {
            foreigner: '',
            native: '',
            student: '',
        },
        types: [],
        customTags: [],
    });

    // State to track whether we are editing an existing place
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    // Predefined types
    const predefinedTypes = ['Monuments', 'Museums', 'Religious Sites', 'Palaces/Castles'];

    // Handle input changes for basic fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (['foreigner', 'native', 'student'].includes(name)) {
            setCurrentPlace({
                ...currentPlace,
                ticketPrices: {
                    ...currentPlace.ticketPrices,
                    [name]: value,
                },
            });
        } else {
            setCurrentPlace({ ...currentPlace, [name]: value });
        }
    };

    // Handle file change for picture
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentPlace({ ...currentPlace, pictures: file });
        }
    };

    // Handle predefined type change
    const handleTypeChange = (type) => {
        setCurrentPlace((prevPlace) => {
            const types = prevPlace.types.includes(type)
                ? prevPlace.types.filter((t) => t !== type)
                : [...prevPlace.types, type];
            return { ...prevPlace, types };
        });
    };

    // Handle custom tag (historical period) addition
    const handleCustomTagAdd = (e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            setCurrentPlace((prevPlace) => ({
                ...prevPlace,
                customTags: [...prevPlace.customTags, e.target.value.trim()],
            }));
            e.target.value = '';
        }
    };

    // Handle add place
    const handleAddPlace = () => {
        setPlaces([...places, currentPlace]);
        resetCurrentPlace();
    };

    // Handle delete place
    const handleDeletePlace = (index) => {
        const updatedPlaces = places.filter((_, i) => i !== index);
        setPlaces(updatedPlaces);
    };

    // Handle edit place
    const handleEditPlace = (index) => {
        setIsEditing(true);
        setEditIndex(index);
        setCurrentPlace(places[index]);
    };

    // Handle update place
    const handleUpdatePlace = () => {
        const updatedPlaces = [...places];
        updatedPlaces[editIndex] = currentPlace;
        setPlaces(updatedPlaces);
        setIsEditing(false);
        resetCurrentPlace();
    };

    // Reset current place form
    const resetCurrentPlace = () => {
        setCurrentPlace({
            name: '',
            description: '',
            pictures: null,
            location: '',
            openingHours: '',
            ticketPrices: {
                foreigner: '',
                native: '',
                student: '',
            },
            types: [],
            customTags: [],
        });
    };

    return (
        <div className="tourism-governor-page">
            <h1>Manage Museums and Historical Places</h1>
            <div className="place-form">
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={currentPlace.name}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={currentPlace.description}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Pictures:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </label>
                {currentPlace.pictures && (
                    <div>
                        <p>Image Preview:</p>
                        <img
                            src={URL.createObjectURL(currentPlace.pictures)}
                            alt="Preview"
                            width="200"
                        />
                    </div>
                )}
                <br />
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={currentPlace.location}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Opening Hours:
                    <input
                        type="text"
                        name="openingHours"
                        value={currentPlace.openingHours}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <h3>Ticket Prices:</h3>
                <label>
                    Foreigner:
                    <input
                        type="text"
                        name="foreigner"
                        value={currentPlace.ticketPrices.foreigner}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Native:
                    <input
                        type="text"
                        name="native"
                        value={currentPlace.ticketPrices.native}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Student:
                    <input
                        type="text"
                        name="student"
                        value={currentPlace.ticketPrices.student}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <h3>Types:</h3>
                {predefinedTypes.map((type) => (
                    <div key={type}>
                        <label>
                            <input
                                type="checkbox"
                                checked={currentPlace.types.includes(type)}
                                onChange={() => handleTypeChange(type)}
                            />
                            {type}
                        </label>
                    </div>
                ))}
                <br />
                <h3>Custom Tags (e.g., Historical Periods):</h3>
                <input
                    type="text"
                    placeholder="Add a tag and press Enter"
                    onKeyDown={handleCustomTagAdd}
                />
                <div className="tags-list">
                    {currentPlace.customTags.map((tag, index) => (
                        <span key={index} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>
                <br />
                {isEditing ? (
                    <button onClick={handleUpdatePlace}>Update Place</button>
                ) : (
                    <button onClick={handleAddPlace}>Add Place</button>
                )}
            </div>
            <div className="places-list">
                <h2>Places List</h2>
                {places.length === 0 ? (
                    <p>No places added yet.</p>
                ) : (
                    <ul>
                        {places.map((place, index) => (
                            <li key={index}>
                                <p><strong>Name:</strong> {place.name}</p>
                                <p><strong>Description:</strong> {place.description}</p>
                                {place.pictures && (
                                    <div>
                                        <p><strong>Pictures:</strong></p>
                                        <img
                                            src={URL.createObjectURL(place.pictures)}
                                            alt={place.name}
                                            width="200"
                                        />
                                    </div>
                                )}
                                <p><strong>Location:</strong> {place.location}</p>
                                <p><strong>Opening Hours:</strong> {place.openingHours}</p>
                                <p><strong>Ticket Prices:</strong></p>
                                <ul>
                                    <li>Foreigner: {place.ticketPrices.foreigner}</li>
                                    <li>Native: {place.ticketPrices.native}</li>
                                    <li>Student: {place.ticketPrices.student}</li>
                                </ul>
                                <p><strong>Types:</strong> {place.types.join(', ')}</p>
                                <p><strong>Custom Tags:</strong> {place.customTags.join(', ')}</p>
                                <button onClick={() => handleEditPlace(index)}>Edit</button>
                                <button onClick={() => handleDeletePlace(index)}>Delete</button>
                                <hr />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TourismGovernorPage;
