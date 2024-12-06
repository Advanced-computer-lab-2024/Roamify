import React, { useState, useEffect } from "react";
import ActivitiesTable from "../Activities/ActivitiesTable.js";
import axios from "axios";
import CreateTagButton from "../Activities/CreateTagButton.js";

const PreferenceTags = () => {
  const [preferenceTags, setPreferenceTags] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Fetch preference tags
  const fetchPreferenceTags = () => {
    axios
      .get("http://localhost:3000/api/preference-tag/get-all", {
        withCredentials: true,
      })
      .then((result) => {
        setPreferenceTags(result.data.tags);
      })
      .catch((error) => console.error(error));
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchPreferenceTags();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Filter tags based on search input
  const filteredTags = preferenceTags.filter((tag) =>
    tag.name.toLowerCase().includes(searchInput.toLowerCase())
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
          Preference Tags
        </h1>

        {/* Search Bar and Create Tag Button */}
        <div style={{ display: "flex", width: "100%" }}>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search tags..."
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

          {/* Create Tag Button */}
          <div style={{ marginLeft: "auto" }}>
            <CreateTagButton
              type={"preference-tag"}
              onCreated={fetchPreferenceTags}
            />
          </div>
        </div>
      </div>

      {/* Table for displaying preference tags */}
      <div style={{ marginTop: "20px", padding: "0px 4vw" }}>
        <ActivitiesTable
          columns={[{ name: "Name" }, { name: "Description" }]}
          categories={filteredTags}
          type={"preference-tag"}
          reFetch={fetchPreferenceTags}
        />
      </div>
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

export default PreferenceTags;
