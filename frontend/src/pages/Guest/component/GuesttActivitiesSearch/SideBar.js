import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PriceSlider from "./PriceSlider";
import DateFilter from "./DateFilter";

const SideBar = ({
  onCategoryApply,
  onSortChange,
  onRatingApply,

  priceRange,
  setPriceRange,
}) => {
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortOrderRating, setSortOrderRating] = useState("asc");
  const [sortOrderPrice, setSortOrderPrice] = useState("asc");
  const [selectedStars, setSelectedStars] = useState([false, false, false, false, false]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/category/get-all");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tag/get-all");
        setTags(response.data.tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchCategories();
    fetchTags();
  }, []);


  const handleCategoryApply = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    onCategoryApply(selectedCategory);
  };

  

  const handleSortOrderRatingChange = (order) => {
    setSortOrderRating(order);
    onSortChange("rating", order);
  };

  const handleSortOrderPriceChange = (order) => {
    setSortOrderPrice(order);
    onSortChange("price", order);
  };

  const handleRatingChange = (index) => {
    const newSelectedStars = [...selectedStars];
    newSelectedStars[index] = !newSelectedStars[index]; // Toggle the checkbox value
    setSelectedStars(newSelectedStars);
  };
  
  const handleApplyFilters = () => {
    const minRating = selectedStars.filter(Boolean).length; // Count selected stars
    onRatingApply(minRating); // Pass minRating to the parent
  };
  return (
    <div className="left_side_search_area">
      

      {/* Price Filter Section */}
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Filter by Price</h5>
        </div>
        <PriceSlider min={priceRange[0]} max={priceRange[1]} onApply={setPriceRange} />
      </div>

      {/* Date Range Filter Section */}
    
      {/* Filter by Category Dropdown */}
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Filter by Category</h5>
        </div>
        <select onChange={(e) => handleCategoryApply(e.target.value)} className="form-control" style={{ marginBottom: "10px" }}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sort by Price Section */}
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Sort by Price</h5>
        </div>
        <div className="name_search_form">
          <label>
            <input
              type="radio"
              checked={sortOrderPrice === "asc"}
              onChange={() => handleSortOrderPriceChange("asc")}
            />
            Ascending
          </label>
          <label>
            <input
              type="radio"
              checked={sortOrderPrice === "desc"}
              onChange={() => handleSortOrderPriceChange("desc")}
            />
            Descending
          </label>
        </div>
      </div>

      {/* Sort by Rating Section */}
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Sort by Rating</h5>
        </div>
        <div className="name_search_form">
          <label>
            <input
              type="radio"
              checked={sortOrderRating === "asc"}
              onChange={() => handleSortOrderRatingChange("asc")}
            />
            Ascending
          </label>
          <label>
            <input
              type="radio"
              checked={sortOrderRating === "desc"}
              onChange={() => handleSortOrderRatingChange("desc")}
            />
            Descending
          </label>
        </div>
      </div>

      {/* Filter by Review Section */}
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Filter by Rating</h5>
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
    </div>
  );
};

export default SideBar;
