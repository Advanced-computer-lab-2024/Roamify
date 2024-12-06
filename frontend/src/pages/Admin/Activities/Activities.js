import React, { useState, useEffect } from "react";
import ActivitiesTable from "./ActivitiesTable.js";
import axios from "axios";
import CreateTagButton from "./CreateTagButton.js";

const Activities = () => {
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Fetch categories
  const fetchCategories = () => {
    axios
      .get(`http://localhost:3000/api/category/get-all`, {
        withCredentials: true,
      })
      .then((result) => {
        setCategories(result.data.categories);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchCategories();
  }, []); // Fetch categories initially

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Filter categories based on search input
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header and Search Bar Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "20px",
          padding: "0px 4vw",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "var(--text-color)",
          }}
        >
          Categories
        </h1>

        {/* Search Bar and Create Category Button */}
        <div style={{ display: "flex", width: "100%" }}>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search categories..."
            value={searchInput}
            onChange={handleSearchChange}
            style={{
              padding: "8px",
              paddingLeft: "1vw",
              borderRadius: "4px",
              border: "1px solid var(--border-color)",
              marginRight: "20px",
              color: "var(--dashboard-title-color)",
              width: "300px",
              background: "var(--secondary-color)",
            }}
          />

          {/* Create Category Button */}
          <div style={{ marginLeft: "auto" }}>
            <CreateTagButton type={"category"} onCreated={fetchCategories} />
          </div>
        </div>
      </div>

      {/* Table for displaying filtered categories */}
      <div style={{ marginTop: "20px", padding: "0px 4vw" }}>
        <ActivitiesTable
          columns={[{ name: "Name" }, { name: "Description" }]}
          categories={filteredCategories}
          type={"category"}
        />
      </div>

      {/* Optional: Add global placeholder styling */}
      <style>
        {`
          input::placeholder {
            color: var(--dashboard-title-color); /* You can replace this with any color you prefer */
          }
        `}
      </style>
    </div>
  );
};

export default Activities;
