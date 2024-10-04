import React, { useState } from 'react';
import "./TourismGovernerPage.css";
import DeleteButton from '../components/Buttons/DeleteButton';
import EditButton from '../components/Buttons/EditButton';
import AddButton from '../components/Buttons/AddButton';
import UpdateButton from '../components/Buttons/UpdateButton';

const API_URL = "https://your-backend-api.com/places"; // Replace with your actual API URL

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

    // Fetch places when component mounts
    useEffect(() => {
        fetchPlaces();
    }, []);

    // Fetch existing places from the backend
    const fetchPlaces = async () => {
        try {
            const response = await fetch(`${API_URL}`);
            const data = await response.json();
            if (data) {
                setPlaces(data); // Load places from backend
            }
        } catch (error) {
            console.error('Error fetching places:', error);
        }
    };

    // Handle input changes
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

    // Handle file change for image upload
    const handleFileChange = (e) => {
        setCurrentPlace({ ...currentPlace, picture: e.target.files[0] });
    };

    // Handle place type changes
    const handleTypeChange = (type) => {
        setCurrentPlace({
            ...currentPlace,
            types: currentPlace.types.includes(type)
                ? currentPlace.types.filter((t) => t !== type)
                : [...currentPlace.types, type],
        });
    };

    // Handle tag addition
    const handleTagAdd = (e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            setCurrentPlace({ ...currentPlace, tags: [...currentPlace.tags, e.target.value.trim()] });
            e.target.value = '';
        }
    };

    // Add a new place to the backend
    const handleAddPlace = async () => {
        try {
            const formData = new FormData();
            formData.append('name', currentPlace.name);
            formData.append('description', currentPlace.description);
            formData.append('picture', currentPlace.picture);
            formData.append('location', currentPlace.location);
            formData.append('hours', currentPlace.hours);
            formData.append('prices', JSON.stringify(currentPlace.prices));
            formData.append('types', currentPlace.types.join(','));
            formData.append('tags', currentPlace.tags.join(','));

            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const newPlace = await response.json();
                setPlaces([...places, newPlace]); // Add new place to the list
                resetPlaceForm();
            }
        } catch (error) {
            console.error('Error adding place:', error);
        }
    };

    // Edit an existing place
    const handleEditPlace = (index) => {
        setIsEditing(true);
        setEditIndex(index);
        setCurrentPlace(places[index]);
    };

    // Update a place in the backend
    const handleUpdatePlace = async () => {
        try {
            const formData = new FormData();
            formData.append('name', currentPlace.name);
            formData.append('description', currentPlace.description);
            formData.append('picture', currentPlace.picture);
            formData.append('location', currentPlace.location);
            formData.append('hours', currentPlace.hours);
            formData.append('prices', JSON.stringify(currentPlace.prices));
            formData.append('types', currentPlace.types.join(','));
            formData.append('tags', currentPlace.tags.join(','));

            const response = await fetch(`${API_URL}/${places[editIndex].id}`, {
                method: 'PUT',
                body: formData,
            });
            if (response.ok) {
                const updatedPlace = await response.json();
                const updatedPlaces = [...places];
                updatedPlaces[editIndex] = updatedPlace; // Update place in state
                setPlaces(updatedPlaces);
                setIsEditing(false);
                resetPlaceForm();
            }
        } catch (error) {
            console.error('Error updating place:', error);
        }
    };

    // Delete a place from the backend
    const handleDeletePlace = async (index) => {
        try {
            const response = await fetch(`${API_URL}/${places[index].id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setPlaces(places.filter((_, i) => i !== index)); // Remove place from list
            }
        } catch (error) {
            console.error('Error deleting place:', error);
        }
    };

    // Reset the place form
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
            <div className="form">
            <h1>Museums and Historical Places</h1>
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
                    <UpdateButton onClick={handleUpdatePlace}></UpdateButton>
                ) : (
                    <AddButton onClick={handleAddPlace}></AddButton>
                )}
            </div>

            <div className="places">
                <h2>Places </h2>
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
                                <EditButton onClick={() => handleEditPlace(index)}></EditButton>
                                <DeleteButton onClick={() => handleDeletePlace(index)}></DeleteButton>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TourismGovernorPage;

