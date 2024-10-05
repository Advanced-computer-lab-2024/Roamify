import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('activity'); // Default type

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, type);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for museums, activities, etc."
      />
      <select onChange={(e) => setType(e.target.value)}>
        <option value="activity">Activity</option>
        <option value=" historical place">Historical Place</option>
        <option value="itinerary">Itinerary</option>
        <option value="museum">Museum</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
