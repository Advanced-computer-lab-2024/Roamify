import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import CommonCard from "./ProductCommonCard";
import productDefault from "./productdefault.png";
import PriceSlider from "../TouristActivitiesSearch/PriceSlider";

const TouristProductsArea = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchName, setSearchName] = useState("");
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [order, setOrder] = useState("asc");
  const [selectedRating, setSelectedRating] = useState(null); // State to track selected rating

  const fetchProducts = async () => {
    setLoading(true);
    setError(""); // Reset error when fetching
    try {
      const response = await axios.get("http://localhost:3000/api/product", {
        params: {
          minPrice: minPrice || 0,
          maxPrice: maxPrice || Infinity,
          name: searchName,
          order: order,
          rating: selectedRating || undefined, // Include rating if one is selected
        },
        withCredentials: true,
      });
      setProducts(response.data.products || []);
      if (response.data.products.length === 0) {
        setError("No products found for the selected rating.");
      }
    } catch (error) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [minPrice, maxPrice, searchName, order, selectedRating]); // Include selectedRating as dependency

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchName(event.target.elements.productName.value);
  };

  const handlePriceRangeApply = (range) => {
    setMinPrice(range[0]);
    setMaxPrice(range[1]);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating); // Update selected rating
    setError(""); // Clear any existing error when changing rating
    setLoading(true); // Set loading state to show fetching in progress
  };

  return (
    <section id="explore_area" className="section_padding">
      <div className="container">
        <SectionHeading heading="Available Products" />
        <div className="row">
          <div className="col-lg-3">
            <div className="left_side_search_area">
              <div className="left_side_search_boxed">
                <div className="left_side_search_heading">
                  <h5>Search by name</h5>
                </div>
                <form className="name_search_form" onSubmit={handleSearch}>
                  <input
                    type="text"
                    name="productName"
                    className="form-control"
                    placeholder="Product Name"
                    defaultValue={searchName}
                  />
                  <button type="submit" className="apply">
                    Search
                  </button>
                </form>
              </div>
              <div className="left_side_search_boxed">
                <div className="left_side_search_heading">
                  <PriceSlider onApply={handlePriceRangeApply} />
                </div>
              </div>
              <div className="left_side_search_boxed">
                <div className="left_side_search_heading">
                  <h5>Sort by Ratings</h5>
                  <select value={order} onChange={handleOrderChange}>
                    <option value="asc" className="apply">
                      Low to High
                    </option>
                    <option value="desc" className="apply">
                      High to Low
                    </option>
                  </select>
                </div>
              </div>
              <div className="left_side_search_boxed">
                <div className="left_side_search_heading">
                  <h5>Filter by Review</h5>
                </div>
                <div className="filter_review">
                  <div className="review_star">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div className="form-check" key={rating}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="rating"
                          checked={selectedRating === rating}
                          onChange={() => handleRatingChange(rating)}
                        />
                        <label className="form-check-label">
                          {[...Array(rating)].map((_, i) => (
                            <i key={i} className="fas fa-star color_theme"></i>
                          ))}
                          {[...Array(5 - rating)].map((_, i) => (
                            <i key={i} className="fas fa-star color_asse"></i>
                          ))}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="row">
              {loading ? (
                <p>Loading products...</p>
              ) : error ? (
                <p>{error}</p>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <div className="col-md-4" key={product._id}>
                    <CommonCard
                      id={product._id}
                      picture={
                        product.picture.length > 0
                          ? product.picture[0].url
                          : productDefault
                      }
                      name={product.name}
                      sellerId={product.sellerId}
                      price={product.price}
                      rating={product.rating}
                      reviewCount={product.reviews.length}
                      description={product.description}
                      grid={true}
                    />
                  </div>
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TouristProductsArea;
