import React, { useState, useEffect } from "react";
import "../css/UpcomingPage.css"; // Import main CSS for styling
import axios from "axios";

const TouristActivities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState("none"); // State for sort type
  const [filterUpcoming, setFilterUpcoming] = useState(false); // State to toggle between all and upcoming activities
  const [minPrice, setMinPrice] = useState(0); // Filter by budget (min price)
  const [maxPrice, setMaxPrice] = useState(1000); // Filter by budget (max price)
  const [selectedDate, setSelectedDate] = useState(""); // Filter by selected date
  const [selectedCategory, setSelectedCategory] = useState(""); // Filter by category
  const [selectedRating, setSelectedRating] = useState(""); // Filter by rating
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [searchType, setSearchType] = useState("name"); // State for selected search type (name, category, tag)

  // Fetch the list of all activities when the component mounts
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/advertiser/get-activities"
        );
        console.log("API Response:", response.data); // Log response for debugging

        // Set the activities if the response data is an array
        if (Array.isArray(response.data)) {
          setActivities(response.data);
        } else {
          console.warn("Unexpected response structure:", response.data);
        }
      } catch (err) {
        console.error("Error fetching activities:", err.message);
        setError("Failed to fetch activities. Please try again later.");
      }
    };

    fetchActivities();
  }, []);

  // Get today's date for comparison
  const today = new Date();

  // Search through all activities based on the searchType (name, category, or tags)
  const searchedActivities = activities.filter((activity) => {
    const searchLower = searchTerm.toLowerCase();

    if (searchType === "name") {
      return activity.name.toLowerCase().includes(searchLower);
    } else if (searchType === "category") {
      return activity.category?.name.toLowerCase().includes(searchLower);
    } else if (searchType === "tag") {
      return (
        activity.tags &&
        activity.tags.some((tag) =>
          tag.name.toLowerCase().includes(searchLower)
        )
      );
    }
    return true; // If no search type is selected, return all activities
  });

  // Apply filters only when viewing upcoming activities
  const filteredUpcomingActivities = searchedActivities.filter((activity) => {
    const isUpcoming = new Date(activity.date) > today;
    const priceWithinRange =
      activity.price >= minPrice && activity.price <= maxPrice;
    const matchesDate = selectedDate
      ? new Date(activity.date).toISOString().split("T")[0] === selectedDate
      : true;
    const matchesCategory = selectedCategory
      ? activity.category?.name === selectedCategory
      : true;
    const matchesRating = selectedRating
      ? activity.rating === parseFloat(selectedRating)
      : true;

    return (
      (!filterUpcoming || isUpcoming) &&
      priceWithinRange &&
      matchesDate &&
      matchesCategory &&
      matchesRating
    );
  });

  // Select activities to display (filtered upcoming or all activities)
  const activitiesToDisplay = filterUpcoming
    ? filteredUpcomingActivities
    : searchedActivities;

  // Sort activities based on the selected sort type
  const sortedActivities = activitiesToDisplay.sort((a, b) => {
    if (sortType === "price-asc") {
      return a.price - b.price;
    } else if (sortType === "price-desc") {
      return b.price - a.price;
    } else if (sortType === "rating-asc") {
      return a.rating - b.rating;
    } else if (sortType === "rating-desc") {
      return b.rating - a.rating;
    }
    return 0; // No sorting
  });

  return (
    <div className="activity-list-page flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-5">
        {filterUpcoming ? "Upcoming Activities" : "All Activities"}
      </h1>

      {/* Search Input and Dropdown */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder={`Search by ${searchType}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-lg"
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="p-2 border rounded-lg ml-4"
        >
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="tag">Tag</option>
        </select>
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col w-full max-w-3xl mb-4">
        {filterUpcoming && (
          <div className="filter-controls mb-4">
            {/* Budget Filter */}
            <label>
              Min Price:
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="p-2 border rounded-lg ml-2"
              />
            </label>
            <label className="ml-4">
              Max Price:
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="p-2 border rounded-lg ml-2"
              />
            </label>

            {/* Date Filter */}
            <label className="ml-4">
              Date:
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="p-2 border rounded-lg ml-2"
              />
            </label>

            {/* Category Filter */}
            <label className="ml-4">
              Category:
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border rounded-lg ml-2"
              >
                <option value="">All Categories</option>
                <option value="Museum">Museum</option>
                <option value="Historical Place">Historical Place</option>
                <option value="Itinerary">Itinerary</option>
                {/* Add more categories as needed */}
              </select>
            </label>

            {/* Rating Filter */}
            <label className="ml-4">
              Rating:
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="p-2 border rounded-lg ml-2"
              >
                <option value="">All Ratings</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </label>
          </div>
        )}

        {/* Sort Dropdown */}
        <div className="sort-controls flex justify-between w-full">
          <button
            className={`p-2 border rounded-lg ${
              !filterUpcoming ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setFilterUpcoming(false)}
          >
            View All Activities
          </button>
          <button
            className={`p-2 border rounded-lg ${
              filterUpcoming ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setFilterUpcoming(true)}
          >
            View Upcoming Activities
          </button>

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="none">Sort by...</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="rating-asc">Rating (Low to High)</option>
            <option value="rating-desc">Rating (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Activities List */}
      <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : sortedActivities.length === 0 ? (
          <p className="text-center">No activities available.</p>
        ) : (
          <ul className="activity-list">
            {sortedActivities.map((activity) => (
              <li
                key={activity._id}
                className="flex justify-between items-center p-4 border-b border-gray-300"
              >
                <div>
                  <h3 className="font-semibold text-lg">{activity.name}</h3>
                  <p>
                    Location:{" "}
                    {activity.location?.name || "Location not specified"}
                  </p>
                  <p>
                    Coordinates:{" "}
                    {activity.location?.coordinates
                      ? `${activity.location.coordinates[0]}, ${activity.location.coordinates[1]}`
                      : "Coordinates not available"}
                  </p>
                  <p>Date: {new Date(activity.date).toLocaleDateString()}</p>
                  <p>Time: {activity.time}</p>
                  <p>
                    Price:{" "}
                    {Array.isArray(activity.price)
                      ? `$${activity.price[0]} - $${activity.price[1]}`
                      : `$${activity.price}`}
                  </p>
                  <p>Rating: {activity.rating}</p>
                  <p>
                    Category:{" "}
                    {activity.category?.name || "Category not specified"}
                  </p>
                  <p>
                    Tags:{" "}
                    {activity.tags && activity.tags.length > 0
                      ? activity.tag.map((tag) => tag.name).join(", ")
                      : "No tags available"}
                  </p>
                  <p>
                    Created By:{" "}
                    {activity.createdBy?.name || "Advertiser not specified"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TouristActivities;
