import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PriceSlider from "./PriceSlider";
import DateFilter from "./DateFilter";

const SideBar = ({
  date,
  setDate,
  onDateApply,
  onCategoryApply,
  onSortChange,
  onRatingApply,
  applyFilters,
  fetchActivities,
}) => {
  const [categoryInput, setCategoryInput] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [searchInput, setSearchInput] = useState("");
  const [searchInputTag, setSearchInputTag] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortOrderRating, setSortOrderRating] = useState("asc");
  const [sortOrderPrice, setSortOrderPrice] = useState("asc");
  const [selectedStars, setSelectedStars] = useState([false, false, false, false, false]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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


  const handleDateApply = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    onDateApply({ startDate, endDate });
  };

  const handleCategoryApply = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    onCategoryApply(selectedCategory);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setSearchInput("");
    setSearchInputTag("");
    setSelectedCategory("");
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchInputTagChange = (event) => {
    setSearchInputTag(event.target.value);
  };
  const handlePriceApply = (priceRange) => {
    setPriceRange(priceRange);
    applyFilters(); // Using onApplyFilters instead of applyFilters
  };
  
  

  const handleSearchClick = () => {
    const searchParams = {};

    if (searchType === "name" && searchInput) {
      searchParams.name = searchInput;
    } else if (searchType === "tag" && searchInputTag) {
      const matchingTag = tags.find((tag) => tag.name.toLowerCase() === searchInputTag.toLowerCase());
      if (matchingTag) {
        searchParams.tags = [matchingTag._id];
      } else {
        toast.info("Tag not found");
        return;
      }
    } else if (searchType === "category" && selectedCategory) {
      searchParams.category = selectedCategory;
    }
    applyFilters();
    fetchActivities(searchParams);
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
    newSelectedStars[index] = !newSelectedStars[index];
    setSelectedStars(newSelectedStars);
  };

  const handleApplyFilters = () => {
    const selectedRating = selectedStars.lastIndexOf(true) + 1;
    onRatingApply(selectedRating);
  };

  return (
    <div className="left_side_search_area">
      {/* Search Bar Section */}
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Search by</h5>
        </div>
        <select value={searchType} onChange={handleSearchTypeChange} className="form-control" style={{ marginBottom: "10px" }}>
          <option value="name">Name</option>
          <option value="tag">Tag</option>
          <option value="category">Category</option>
        </select>

        {searchType === "name" && (
          <input
            type="text"
            placeholder="Search by name..."
            value={searchInput}
            onChange={handleSearchInputChange}
            className="form-control"
            style={{ marginBottom: "10px" }}
          />
        )}

        {searchType === "tag" && (
          <input
            type="text"
            placeholder="Search by tag..."
            value={searchInputTag}
            onChange={handleSearchInputTagChange}
            className="form-control"
            style={{ marginBottom: "10px" }}
          />
        )}

        {searchType === "category" && (
          <select value={selectedCategory} onChange={(e) => handleCategoryApply(e.target.value)} className="form-control" style={{ marginBottom: "10px" }}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        )}

        <button onClick={handleSearchClick} className="btn btn_theme btn_sm">
          Search
        </button>
      </div>

      {/* Price Filter Section */}
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Filter by Price</h5>
        </div>
        <PriceSlider onApply={handlePriceApply} />
      </div>

      {/* Date Range Filter Section */}
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Filter by Date</h5>
        </div>
        <DateFilter date={date} setdate={setDate} onApply={handleDateApply} />
      </div>

      {/* Filter by Category Dropdown */}
      <div className="left_side_search_boxed">
        <div className="left_side_search_heading">
          <h5>Filter by Category</h5>
        </div>
        <select onChange={(e) => handleCategoryApply(e.target.value)}>
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
        <div className="name_search_form" style={{ display: "block" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            <input
              type="checkbox"
              checked={sortOrderPrice === "asc"}
              onChange={() => handleSortOrderPriceChange("asc")}
            />
            Ascending
          </label>
          <label style={{ display: "block" }}>
            <input
              type="checkbox"
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
        <div className="name_search_form" style={{ display: "block" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            <input
              type="checkbox"
              checked={sortOrderRating === "asc"}
              onChange={() => handleSortOrderRatingChange("asc")}
            />
            Ascending
          </label>
          <label style={{ display: "block" }}>
            <input
              type="checkbox"
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
        </div>
      </div>
    </div>
  );
};

export default SideBar;
