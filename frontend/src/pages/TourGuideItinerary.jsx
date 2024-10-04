import React, { useState } from 'react';
import './TourGuideItinerary.css';
import AddButton from '../components/Buttons/AddButton';
import UpdateButton from '../components/Buttons/UpdateButton';
import EditButton from '../components/Buttons/EditButton';
import DeleteButton from '../components/Buttons/DeleteButton';
import axios from 'axios';
const TourGuideItinerary = () => {
    // State to manage the list of itineraries
    const [itineraries, setItineraries] = useState([]);

    // State to manage the current itinerary being added or edited
    const [currentItinerary, setCurrentItinerary] = useState({
        activities: '',
        locations: '',
        timeline: '',
        duration: '',
        language: '',
        price: '',
        availableDates: '',
        accessibility: '',
        pickupDropoff: '',
    });

    // State to track whether we are editing an existing itinerary
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    // Fetch itineraries from backend on component mount
    useEffect(() => {
        fetchItineraries();
    }, []);

    // Fetch all itineraries
    const fetchItineraries = async () => {
        try {
            const response = await axios.get('/api/itineraries'); // Replace with your API endpoint
            setItineraries(response.data);
        } catch (error) {
            console.error('Error fetching itineraries:', error);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentItinerary({ ...currentItinerary, [name]: value });
    };

    // Handle add itinerary
    const handleAddItinerary = async () => {
        try {
            const response = await axios.post('/api/itineraries', currentItinerary); // Replace with your API endpoint
            setItineraries([...itineraries, response.data]);
            resetItineraryForm();
        } catch (error) {
            console.error('Error adding itinerary:', error);
        }
    };

    // Handle edit itinerary
    const handleEditItinerary = (index) => {
        setIsEditing(true);
        setEditIndex(index);
        setCurrentItinerary(itineraries[index]);
    };

    // Handle update itinerary
    const handleUpdateItinerary = async () => {
        try {
            const itineraryId = itineraries[editIndex]._id; // Assuming itineraries have a unique _id
            const response = await axios.put(`/api/itineraries/${itineraryId}`, currentItinerary); // Replace with your API endpoint
            const updatedItineraries = [...itineraries];
            updatedItineraries[editIndex] = response.data;
            setItineraries(updatedItineraries);
            resetItineraryForm();
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating itinerary:', error);
        }
    };

    // Handle delete itinerary
    const handleDeleteItinerary = async (index) => {
        try {
            const itineraryId = itineraries[index]._id; // Assuming itineraries have a unique _id
            await axios.delete(`/api/itineraries/${itineraryId}`); // Replace with your API endpoint
            const updatedItineraries = itineraries.filter((_, i) => i !== index);
            setItineraries(updatedItineraries);
        } catch (error) {
            console.error('Error deleting itinerary:', error);
        }
    };

    // Reset the itinerary form
    const resetItineraryForm = () => {
        setCurrentItinerary({
            activities: '',
            locations: '',
            timeline: '',
            duration: '',
            language: '',
            price: '',
            availableDates: '',
            accessibility: '',
            pickupDropoff: '',
        });
    };

    return (
        <div className="tour-guide-itinerary">
            <div className="itinerary-form">
                <label>
                <h1>Manage Itineraries</h1>
                    Activities:
                    <input
                        type="text"
                        name="activities"
                        value={currentItinerary.activities}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Locations to be Visited:
                    <input
                        type="text"
                        name="locations"
                        value={currentItinerary.locations}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Timeline:
                    <input
                        type="text"
                        name="timeline"
                        value={currentItinerary.timeline}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Duration of Each Activity:
                    <input
                        type="text"
                        name="duration"
                        value={currentItinerary.duration}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Language of Tour:
                    <input
                        type="text"
                        name="language"
                        value={currentItinerary.language}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Price of Tour:
                    <input
                        type="text"
                        name="price"
                        value={currentItinerary.price}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Available Dates and Times:
                    <input
                        type="text"
                        name="availableDates"
                        value={currentItinerary.availableDates}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Accessibility:
                    <input
                        type="text"
                        name="accessibility"
                        value={currentItinerary.accessibility}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Pick-up/Drop-off Location:
                    <input
                        type="text"
                        name="pickupDropoff"
                        value={currentItinerary.pickupDropoff}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                {isEditing ? (
                    <UpdateButton onClick={handleUpdateItinerary}></UpdateButton>
                ) : (
                    <AddButton onClick={handleAddItinerary}></AddButton>
                )}
            </div>
            <div className="itinerary-list">
                <h2>Itineraries List</h2>
                {itineraries.length === 0 ? (
                    <p>No itineraries added yet.</p>
                ) : (
                    <ul>
                        {itineraries.map((itinerary, index) => (
                            <li key={index}>
                                <p><strong>Activities:</strong> {itinerary.activities}</p>
                                <p><strong>Locations:</strong> {itinerary.locations}</p>
                                <p><strong>Timeline:</strong> {itinerary.timeline}</p>
                                <p><strong>Duration:</strong> {itinerary.duration}</p>
                                <p><strong>Language:</strong> {itinerary.language}</p>
                                <p><strong>Price:</strong> {itinerary.price}</p>
                                <p><strong>Available Dates:</strong> {itinerary.availableDates}</p>
                                <p><strong>Accessibility:</strong> {itinerary.accessibility}</p>
                                <p><strong>Pick-up/Drop-off Location:</strong> {itinerary.pickupDropoff}</p>
                                <EditButton onClick={() => handleEditItinerary(index)}></EditButton>
                                <DeleteButton onClick={() => handleDeleteItinerary(index)}></DeleteButton>
                                <hr />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TourGuideItinerary;
