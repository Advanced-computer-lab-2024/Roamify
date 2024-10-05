import React, { useState } from 'react';

const FilterActivities = ({ onFilter }) => {
  const [budget, setBudget] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ budget, date, category, rating });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="Max Budget"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Min Rating"
      />
      <button type="submit">Filter</button>
    </form>
  );
};

export default FilterActivities;
