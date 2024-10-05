import React from "react";

const SearchBar = ({ placeholder, onSearch }) => {
  return (
    <div className="flex items-center bg-white shadow-md rounded-full w-full max-w-md p-2">
      <input
        type="text"
        id="usersSearchBar"
        placeholder={placeholder || "Search..."}
        className="bg-transparent flex-grow px-4 py-2 text-gray-700 focus:outline-none"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSearch(e.target.value);
          }
        }}
      />
      <button
        className="bg-primary text-white p-2 rounded-full hover:bg-blue-600 transition duration-200 ease-in-out"
        onClick={() =>
          onSearch(document.getElementById("usersSearchBar").value)
        }
      ></button>
    </div>
  );
};

export default SearchBar;
