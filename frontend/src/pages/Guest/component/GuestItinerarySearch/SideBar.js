import React, { useState } from "react";
import DateFilter from "../GuesttActivitiesSearch/DateFilter";
const SideBar = ({ date, setdate, onDateApply, onSortChange, onRatingApply }) => {
  const [sortField, setSortField] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedStars, setSelectedStars] = useState([false, false, false, false, false]);

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
    const minRating = selectedStars.filter(Boolean).length;
    onRatingApply(minRating);
  };

  return (
    <div className="left_side_search_area">
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Filter by Date</h5>
        </div>
        <div className="tour_search_type">
          <div className="filter-date">
            <DateFilter date={date} setdate={setdate} onApply={onDateApply} />
          </div>
        </div>
      </div>

      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Sort by Price</h5>
        </div>
        <div className="name_search_form">
          <label>
            <input
              type="radio"
              name="sortPriceOrder"
              value="asc"
              checked={sortField === "price" && sortOrder === "asc"}
              onChange={() => handleSortChange("price", "asc")}
            />
            Ascending
          </label>
          <label>
            <input
              type="radio"
              name="sortPriceOrder"
              value="desc"
              checked={sortField === "price" && sortOrder === "desc"}
              onChange={() => handleSortChange("price", "desc")}
            />
            Descending
          </label>
        </div>
      </div>

      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Sort by Rating</h5>
        </div>
        <div className="name_search_form">
          <label>
            <input
              type="radio"
              name="sortRatingOrder"
              value="asc"
              checked={sortField === "rating" && sortOrder === "asc"}
              onChange={() => handleSortChange("rating", "asc")}
            />
            Ascending
          </label>
          <label>
            <input
              type="radio"
              name="sortRatingOrder"
              value="desc"
              checked={sortField === "rating" && sortOrder === "desc"}
              onChange={() => handleSortChange("rating", "desc")}
            />
            Descending
          </label>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
