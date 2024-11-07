import React, { useState } from "react";

const SideBar = ({
  date,
  setdate,
  onDateApply,
  onCategoryApply,
  onSortChange,
}) => {
  const [categoryInput, setCategoryInput] = useState("");
  const [searchType, setSearchType] = useState("category");
  const [sortOrder, setSortOrder] = useState("asc"); // Only for ratings

  // Date range states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Handle search input and type selection
  const handleCategoryInputChange = (event) => {
    setCategoryInput(event.target.value);
  };
  
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleCategoryApplyClick = () => {
    onCategoryApply({ type: searchType, value: categoryInput });
  };

  const handleDateApplyClick = () => {
    onDateApply({ startDate, endDate });
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    onSortChange("rating", order);
  };

  return (
    <div className="left_side_search_area">
      {/* Date Filter Section */}
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Filter by Date</h5>
        </div>
        <div className="tour_search_type">
          <div className="filter-date" style={{ display: "block" }}>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
              style={{ marginBottom: "10px" }}
            />
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
              style={{ marginBottom: "10px" }}
            />
            <button onClick={handleDateApplyClick} className="btn btn_theme btn_sm">
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Category/Name/Tag Search Section */}
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Search by</h5>
        </div>
        <div className="name_search_form" style={{ display: "block" }}>
          <select
            className="form-control"
            value={searchType}
            onChange={handleSearchTypeChange}
            style={{ marginBottom: "10px" }}
          >
            <option value="category">Category</option>
            <option value="name">Name</option>
            <option value="tag">Tag</option>
          </select>
          <input
            className="form-control"
            type="text"
            placeholder={`Search by ${searchType}...`}
            value={categoryInput}
            onChange={handleCategoryInputChange}
            style={{ marginBottom: "10px" }}
          />
          <button onClick={handleCategoryApplyClick} className="btn btn_theme btn_sm">
            Apply
          </button>
        </div>
      </div>


      {/* Sort by Rating Section */}
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Sort by Rating</h5>
        </div>
        <div className="name_search_form" style={{ display: "block" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            <input
              type="checkbox"
              checked={sortOrder === "asc"}
              onChange={() => handleSortOrderChange("asc")}
            />
            Ascending
          </label>
          <label style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={sortOrder === "desc"}
              onChange={() => handleSortOrderChange("desc")}
            />
            Descending
          </label>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
