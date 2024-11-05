import React, { useState } from "react";
import DateFilter from "./DateFilter";
const SideBar = ({ priceRange, setPriceRange, onPriceApply, date, setdate, onDateApply, onCategoryApply,onSortChange,  onRatingApply }) => {
  
  const [categoryInput, setCategoryInput] = useState("");
  const [sortField, setSortField] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedStars, setSelectedStars] = useState([false, false, false, false, false]); // Track selected stars
  const handleCategoryInputChange = (event) => {
    setCategoryInput(event.target.value);
  };

  const handleCategoryApplyClick = () => {
    onCategoryApply(categoryInput); // Call the parent handler with the current input value
  };

  const handleSortChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
    onSortChange(field, order);
  };
  const handleRatingChange = (index) => {
    const newSelectedStars = selectedStars.map((star, i) => i <= index);
    setSelectedStars(newSelectedStars);
  };
  const handleApplyFilters = () => {
    const minRating = selectedStars.filter(Boolean).length; // Count selected stars
    onRatingApply(minRating); // Pass minRating to the parent
  };
  return (
    <>
      <div className="left_side_search_area">
        
        <div className="left_side_search_boxed">
          <div className="left_side_search_heading">
            <h5>Filter by Date</h5>
          </div>
          <div className="tour_search_type">
          <div className="filter-date">
          <DateFilter
            date={date}
            setdate={setdate}
            onApply={onDateApply}
          />
        </div>
          </div>
        </div>
        
        <div className="left_side_search_boxed">
          <div className="left_side_search_heading">
            <h5>Search by Category or Name or Tag </h5>
          </div>
          <div className="name_search_form">
        <input
        className="form-control"
          type="text"
          placeholder="Search..."
          value={categoryInput}
          onChange={handleCategoryInputChange}
        />
        <button onClick={handleCategoryApplyClick} className="apply" type="button">
          Apply
        </button>
      </div>
        </div>
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
            <button onClick={handleApplyFilters} className="apply" type="button">
              Apply Rating Filter
            </button>
          </div>
        </div>
        <div className="left_side_search_boxed">
          <div className="left_side_search_heading">
            <h5>Sort by</h5>
          </div>
          <div className="name_search_form">
          <label>
            <input
              type="radio"
              name="sortField"
              value="price"
              checked={sortField === "price"}
              onChange={() => handleSortChange("price", sortOrder)}
            />
            Price
          </label>
          <label>
            <input
              type="radio"
              name="sortField"
              value="rating"
              checked={sortField === "rating"}
              onChange={() => handleSortChange("rating", sortOrder)}
            />
            Rating
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="sortOrder"
              value="asc"
              checked={sortOrder === "asc"}
              onChange={() => handleSortChange(sortField, "asc")}
            />
            Ascending
          </label>
          <label>
            <input
              type="radio"
              name="sortOrder"
              value="desc"
              checked={sortOrder === "desc"}
              onChange={() => handleSortChange(sortField, "desc")}
            />
            Descending
          </label>
        </div>
      </div>
      </div>
    </>
  );
};

export default SideBar;
