import React, { useState } from "react";
import DateFilter from "./DateFilter";

const SideBar = ({
  date,
  setdate,
  onDateApply,
  onCategoryApply,
  onSortChange,
  onRatingApply, // Pass the function to apply rating filter
}) => {
  const [categoryInput, setCategoryInput] = useState("");
  const [searchType, setSearchType] = useState("category");
  const [sortOrder, setSortOrder] = useState("asc");

  // Date range states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Star rating filter state
  const [selectedStars, setSelectedStars] = useState([false, false, false, false, false]);

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

  // Toggle selected stars for rating filter
  const handleRatingChange = (index) => {
    const newSelectedStars = [...selectedStars];
    newSelectedStars[index] = !newSelectedStars[index];
    setSelectedStars(newSelectedStars);
  };

  const handleApplyFilters = () => {
    const selectedRating = selectedStars.lastIndexOf(true) + 1;
    onRatingApply(selectedRating); // Apply rating based on the highest selected star count
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
        </div>
      </div>

      {/* Sort by Price Section */}
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Sort by Price</h5>
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

      {/* Filter by Review Section */}
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Filter by Review</h5>
        </div>
        <div className="filter_review">
          <form className="review_star">
            {selectedStars.map((isChecked, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleRatingChange(index)}
                />
                <label className="form-check-label">
                  {[...Array(index + 1)].map((_, i) => (
                    <i key={i} className="fas fa-star color_theme"></i>
                  ))}
                  {[...Array(5 - (index + 1))].map((_, i) => (
                    <i key={i} className="fas fa-star color_asse"></i>
                  ))}
                </label>
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
