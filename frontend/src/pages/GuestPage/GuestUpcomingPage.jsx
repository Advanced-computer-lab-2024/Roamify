import React, { useState, useEffect } from 'react';
import axios from 'axios';



const ItineraryPage = () => {
    const [itineraries, setItineraries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [sortType, setSortType] = useState('none');
    const [minBudget, setMinBudget] = useState(0);
    const [maxBudget, setMaxBudget] = useState(1000);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');

    // Format date function: yyyy/mm/dd
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero to month if needed
        const day = date.getDate().toString().padStart(2, '0'); // Add leading zero to day if needed
        return `${year}/${month}/${day}`;
    };

    // Fetch itineraries from API
    useEffect(() => {
        const fetchItineraries = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/api/Itineraries');
                setItineraries(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch itineraries');
            } finally {
                setLoading(false);
            }
        };

        fetchItineraries();
    }, []);

    const safeItineraries = Array.isArray(itineraries) ? itineraries : [];

    // Handle preferences change (checkboxes)
    const handlePreferencesChange = (e) => {
        const value = e.target.value;
        if (selectedPreferences.includes(value)) {
            setSelectedPreferences(selectedPreferences.filter(pref => pref !== value));
        } else {
            setSelectedPreferences([...selectedPreferences, value]);
        }
    };

    // Sort and filter itineraries
    const sortedItineraries = safeItineraries
        .filter(itinerary => {
            const priceWithinRange = itinerary.price >= minBudget && itinerary.price <= maxBudget;
            const matchesDate = selectedDate ? new Date(itinerary.date) >= new Date(selectedDate) : true;
            const matchesPreferences = selectedPreferences.length === 0 || selectedPreferences.every(pref => itinerary.preferences?.includes(pref));
            const matchesLanguage = selectedLanguage ? itinerary.language === selectedLanguage : true;

            return priceWithinRange && matchesDate && matchesPreferences && matchesLanguage;
        })
        .sort((a, b) => {
            if (sortType === 'price-asc') {
                return a.price - b.price;
            } else if (sortType === 'price-desc') {
                return b.price - a.price;
            } else if (sortType === 'rating-asc') {
                return a.rating - b.rating;
            } else if (sortType === 'rating-desc') {
                return b.rating - a.rating;
            }
            return 0;
        });

    return (
        <div>
            <h1>Itinerary Page</h1>

            {/* Filter and Sort Controls */}
            <div className="filter-controls">
                <div className="budget-filter">
                    <label>
                        Min Budget:
                        <input
                            type="number"
                            value={minBudget}
                            onChange={(e) => setMinBudget(Number(e.target.value))}
                        />
                    </label>
                    <label>
                        Max Budget:
                        <input
                            type="number"
                            value={maxBudget}
                            onChange={(e) => setMaxBudget(Number(e.target.value))}
                        />
                    </label>
                </div>

                <label>
                    Date:
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </label>

                <label>
                    Language:
                    <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
                        <option value="">All Languages</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Arabic">Arabic</option>
                        {/* Add more languages as needed */}
                    </select>
                </label>

                <div className="preferences-filter">
                    <h4>Preferences:</h4>
                    <label>
                        <input
                            type="checkbox"
                            value="historic areas"
                            onChange={handlePreferencesChange}
                            checked={selectedPreferences.includes('historic areas')}
                        />
                        Historic Areas
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="beaches"
                            onChange={handlePreferencesChange}
                            checked={selectedPreferences.includes('beaches')}
                        />
                        Beaches
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="family-friendly"
                            onChange={handlePreferencesChange}
                            checked={selectedPreferences.includes('family-friendly')}
                        />
                        Family-Friendly
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="shopping"
                            onChange={handlePreferencesChange}
                            checked={selectedPreferences.includes('shopping')}
                        />
                        Shopping
                    </label>
                </div>

                {/* Sort Dropdown */}
                <label>
                    Sort by:
                    <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
                        <option value="none">None</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                        <option value="rating-asc">Rating (Low to High)</option>
                        <option value="rating-desc">Rating (High to Low)</option>
                    </select>
                </label>
            </div>

            {/* Itinerary List */}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : sortedItineraries.length === 0 ? (
                <p>No itineraries available.</p>
            ) : (
                <ul>
                    {sortedItineraries.map((itinerary) => (
                        <li key={itinerary.id}>
                            <h2>{itinerary.name}</h2>
                            <p>Price: ${itinerary.price}</p>
                            <p>Rating: {itinerary.rating}</p>
                            <p>Date: {formatDate(itinerary.date)}</p> {/* Date in yyyy/mm/dd format */}
                            <p>Language: {itinerary.language || 'Not specified'}</p>
                            <p>Destinations: {itinerary.destinations?.join(', ') || 'None'}</p>
                            <p>Preferences: {itinerary.preferences?.join(', ') || 'None'}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ItineraryPage;
