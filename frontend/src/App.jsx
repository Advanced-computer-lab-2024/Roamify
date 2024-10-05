import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import FilterActivities from './components/FilterActivities';
import ActivityList from './components/ActivityList';
import { fetchUpcomingItems, searchItems } from './api';

const App = () => {
  const [searchResults, setSearchResults] = useState([]); // Holds search results for all items
  const [filteredItems, setFilteredItems] = useState([]); // Holds filtered activities, places, and itineraries
  const [upcomingItems, setUpcomingItems] = useState({
    upcomingActivities: [],
    upcomingItineraries: [],
    upcomingPlaces: []
  }); // Initial data
  const [filterCriteria, setFilterCriteria] = useState({}); // For filter criteria

  // Fetch all upcoming activities, places, and itineraries when the component loads
  useEffect(() => {
    const loadUpcomingItems = async () => {
      const data = await fetchUpcomingItems();
      setUpcomingItems(data); // Save fetched data
      setSearchResults([...data.upcomingActivities, ...data.upcomingItineraries, ...data.upcomingPlaces]);
    };
    loadUpcomingItems();
  }, []); // Runs once when component mounts

  // Function to handle search
  const handleSearch = async (query, type) => {
    try {
      const results = await searchItems(query, type);
      setSearchResults(results); // Update search results based on query
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  // Function to handle filtering
  const handleFilter = async (criteria) => {
    try {
      const data = await fetchUpcomingItems();
      const allItems = [
        ...data.upcomingActivities,
        ...data.upcomingItineraries,
        ...data.upcomingPlaces
      ];

      const filtered = allItems.filter(item => {
        // Check the item type to ensure we access the correct properties
        const isActivity = 'date' in item;
        const isItinerary = 'availableDates' in item;
        const isPlace = 'type' in item; // Adjust based on your place model properties

        return (
          (criteria.budget ? item.price <= criteria.budget : true) &&
          (criteria.date ? (
            (isActivity && new Date(item.date) <= new Date(criteria.date)) ||
            (isItinerary && item.availableDates.some(date => new Date(date) <= new Date(criteria.date)))
          ) : true) &&
          (criteria.category ? (isActivity && item.category === criteria.category) : true) &&
          (criteria.rating ? (isActivity && item.rating >= criteria.rating) : true)
        );
      });

      setFilteredItems(filtered); // Update filtered items
    } catch (error) {
      console.error("Error during filtering:", error);
    }
  };

  return (
    <div>
      <h1>Roamify</h1>
      <SearchBar onSearch={handleSearch} />
      <FilterActivities onFilter={handleFilter} />
      {/* Show filtered items if any, otherwise show search results */}
      <ActivityList activities={filteredItems.length ? filteredItems : searchResults} />
    </div>
  );
};

export default App;


