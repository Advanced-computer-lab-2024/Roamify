import React, { useState } from 'react';
import "./TourismGovernerPage.css";

const TourismGovernorPage = () => {
    const [places, setPlaces] = useState([]);
    const [currentPlace, setCurrentPlace] = useState({
        name: '',
        description: '',
        picture: null,
        location: '',
        hours: '',
        prices: { foreigner: '', native: '', student: '' },
        types: [],
        tags: [],
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const placeTypes = ['Monuments', 'Museums', 'Religious Sites', 'Palaces/Castles'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (['foreigner', 'native', 'student'].includes(name)) {
            setCurrentPlace({
                ...currentPlace,
                prices: { ...currentPlace.prices, [name]: value },
            });
        } else {
            setCurrentPlace({ ...currentPlace, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        setCurrentPlace({ ...currentPlace, picture: e.target.files[0] });
    };

    const handleTypeChange = (type) => {
        setCurrentPlace({
            ...currentPlace,
            types: currentPlace.types.includes(type)
                ? currentPlace.types.filter((t) => t !== type)
                : [...currentPlace.types, type],
        });
    };

    const handleTagAdd = (e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            setCurrentPlace({ ...currentPlace, tags: [...currentPlace.tags, e.target.value.trim()] });
            e.target.value = '';
        }
    };

    const handleAddPlace = () => {
        setPlaces([...places, currentPlace]);
        resetPlaceForm();
    };

    const handleEditPlace = (index) => {
        setIsEditing(true);
        setEditIndex(index);
        setCurrentPlace(places[index]);
    };

    const handleUpdatePlace = () => {
        const updatedPlaces = [...places];
        updatedPlaces[editIndex] = currentPlace;
        setPlaces(updatedPlaces);
        setIsEditing(false);
        resetPlaceForm();
    };

    const handleDeletePlace = (index) => {
        setPlaces(places.filter((_, i) => i !== index));
    };

    const resetPlaceForm = () => {
        setCurrentPlace({
            name: '',
            description: '',
            picture: null,
            location: '',
            hours: '',
            prices: { foreigner: '', native: '', student: '' },
            types: [],
            tags: [],
        });
    };

    return (
        <div className="tourism-page">
            <h1>Museums and Historical Places</h1>
            <div className="form">
                <input type="text" name="name" placeholder="Name" value={currentPlace.name} onChange={handleInputChange} />
                <textarea name="description" placeholder="Description" value={currentPlace.description} onChange={handleInputChange} />
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {currentPlace.picture && <img src={URL.createObjectURL(currentPlace.picture)} alt="Preview" width="200" />}
                <input type="text" name="location" placeholder="Location" value={currentPlace.location} onChange={handleInputChange} />
                <input type="text" name="hours" placeholder="Opening Hours" value={currentPlace.hours} onChange={handleInputChange} />

                <div className="prices">
                    <input type="text" name="foreigner" placeholder="Foreigner Price" value={currentPlace.prices.foreigner} onChange={handleInputChange} />
                    <input type="text" name="native" placeholder="Native Price" value={currentPlace.prices.native} onChange={handleInputChange} />
                    <input type="text" name="student" placeholder="Student Price" value={currentPlace.prices.student} onChange={handleInputChange} />
                </div>

                <h3>Types:</h3>
                {placeTypes.map((type) => (
                    <label key={type}>
                        <input type="checkbox" checked={currentPlace.types.includes(type)} onChange={() => handleTypeChange(type)} />
                        {type}
                    </label>
                ))}

                <input type="text" placeholder="Add a tag and press Enter" onKeyDown={handleTagAdd} />
                <div className="tags">
                    {currentPlace.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>

                {isEditing ? (
                    <button onClick={handleUpdatePlace}>Update Place</button>
                ) : (
                    <button onClick={handleAddPlace}>Add Place</button>
                )}
            </div>

            <div className="places">
                <h2>Places List</h2>
                {places.length === 0 ? <p>No places added yet.</p> : (
                    <ul>
                        {places.map((place, index) => (
                            <li key={index}>
                                <strong>{place.name}</strong>
                                <p>{place.description}</p>
                                {place.picture && <img src={URL.createObjectURL(place.picture)} alt={place.name} width="200" />}
                                <p>Location: {place.location}</p>
                                <p>Hours: {place.hours}</p>
                                <p>Prices: Foreigner: {place.prices.foreigner}, Native: {place.prices.native}, Student: {place.prices.student}</p>
                                <p>Types: {place.types.join(', ')}</p>
                                <p>Tags: {place.tags.join(', ')}</p>
                                <button onClick={() => handleEditPlace(index)}>Edit</button>
                                <button onClick={() => handleDeletePlace(index)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TourismGovernorPage;

