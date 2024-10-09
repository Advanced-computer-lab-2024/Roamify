import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/UpcomingPage.css"; // Importing CSS for consistent styling

const TouristPlacesPage = () => {
  const [places, setPlaces] = useState([]); // State for places (all/filtered)
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors
  const [tag, setTag] = useState(""); // State for the tag filter
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [searchType, setSearchType] = useState("name"); // State for search type (name, category, tag)

  // Fetch all places initially
  useEffect(() => {
    const fetchAllPlaces = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/tourismgoverner/get-places"
        );
        console.log("API Response:", response.data); // Log response for debugging
        setPlaces(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch places");
      } finally {
        setLoading(false);
      }
    };

    fetchAllPlaces(); // Fetch all places when the page loads
  }, []);

  // Filter places based on the search term, search type, and tag
  const filteredPlaces = places.filter((place) => {
    const term = searchTerm.toLowerCase();
    const isTagMatch =
      tag === "" ||
      (place.tags &&
        place.tags.some((t) =>
          t.name.toLowerCase().includes(tag.toLowerCase())
        ));

    const isSearchMatch =
      searchType === "name"
        ? place.name.toLowerCase().includes(term)
        : searchType === "category"
        ? place.category?.toLowerCase().includes(term)
        : place.tags?.some((t) => t.name.toLowerCase().includes(term));

    return isTagMatch && isSearchMatch;
  });

  // Handle tag input change
  const handleTagChange = (e) => {
    setTag(e.target.value); // Update the tag state when input changes
  };

  // Handle search input change
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term state when input changes
  };

  // Handle search type change
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value); // Update the search type state when the dropdown changes
  };

  return (
    <div className="activity-list-page flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-5">Historical Places</h1>

      {/* Search bar by name, category, tag, and the tag filter input */}
      <div className="flex gap-4 mb-5">
        {/* Search input */}
        <input
          type="text"
          placeholder={`Search by ${searchType}...`}
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="border rounded p-2"
        />
        {/* Dropdown to select search type */}
        <select
          value={searchType}
          onChange={handleSearchTypeChange}
          className="p-2 border rounded"
        >
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="tag">Tag</option>
        </select>

        {/* Tag filter input */}
        <input
          type="text"
          placeholder="Enter tag to filter..."
          value={tag}
          onChange={handleTagChange}
          className="border rounded p-2"
        />
      </div>

      {/* Loading message and place details rendering */}
      <div className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        {loading ? (
          <p className="text-center">Loading places...</p> // Display loading message
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p> // Display error message
        ) : filteredPlaces.length === 0 ? (
          <p className="text-center">No places available.</p> // Display when no places are found
        ) : (
          <ul className="place-list">
            {filteredPlaces.map((place) => (
              <li
                key={place._id}
                className="flex flex-col border-b border-gray-300 p-4"
              >
                <h3 className="font-semibold text-lg">{place.name}</h3>
                <p>Description: {place.description}</p>
                <p>Type: {place.location.type}</p>
                <p>
                  Location:
                  {place.location.coordinates
                    ? ` ${place.location.coordinates[1]}, ${place.location.coordinates[0]}`
                    : " Not specified"}
                </p>
                <p>
                  Location:
                  {place.location.name
                    ? ` ${place.location.name}`
                    : " Not specified"}
                </p>
                <p>Time: {place.time}</p>
                <p>Ticket:$ {place.price}</p>

                <p>
                  Tags:{" "}
                  {place.tags && place.tags.length > 0
                    ? place.tags.map((tag) => tag.name).join(", ")
                    : "No tags available"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TouristPlacesPage;
