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
  const [searchName, setSearchName] = useState(""); // State to hold the search input
  const [minPrice, setMinPrice] = useState(10); // Default minimum price
  const [maxPrice, setMaxPrice] = useState(1000); // Default maximum price
  const [order, setOrder] = useState("asc"); // Default sorting order

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/product", {
        params: {
          minPrice,
          maxPrice,
          name: searchName, // Use search name for filtering
          order,
        },
        withCredentials: true,
      });
      setProducts(response.data.products || []);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setProducts([]); // Set activities to empty if 404
        setError("No products found"); // Display error message
      } else {
        setError("Failed to fetch products");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [minPrice, maxPrice, searchName, order]); // Fetch products when dependencies change

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchName(event.target.elements.productName.value); // Update search name based on input
  };
  const handlePriceRangeApply = (range) => {
    setMinPrice(range[0]);
    setMaxPrice(range[1]);
  };
  const handleOrderChange = (event) => {
    setOrder(event.target.value); // Update sorting order
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
                  <form className="review_star">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        <i className="fas fa-star color_theme"></i>
                        <i className="fas fa-star color_theme"></i>
                        <i className="fas fa-star color_theme"></i>
                        <i className="fas fa-star color_theme"></i>
                        <i className="fas fa-star color_theme"></i>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault1"
                      >
                        <i className="fas fa-star color_theme"></i>
                        <i className="fas fa-star color_theme"></i>
                        <i className="fas fa-star color_theme"></i>
                        <i className="fas fa-star color_theme"></i>
                        <i className="fas fa-star color_asse"></i>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault2"
                      >
                        <i className="fas fa-star color_theme"></i>
                        <i className="fas fa-star color_theme"></i>
                        <i className="fas fa-star color_theme"></i>
                        <i className="fas fa-star color_asse"></i>
                        <i className="fas fa-star color_asse"></i>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault3"
                      >
                        <i className="fas fa-star color_theme"></i>
                        <i className="fas fa-star color_theme"></i>
                        <i className="fas fa-star color_asse"></i>
                        <i className="fas fa-star color_asse"></i>
                        <i className="fas fa-star color_asse"></i>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault5"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault5"
                      >
                        <i className="fas fa-star color_theme"></i>
                        <i className="fas fa-star color_asse"></i>
                        <i className="fas fa-star color_asse"></i>
                        <i className="fas fa-star color_asse"></i>
                        <i className="fas fa-star color_asse"></i>
                      </label>
                    </div>
                  </form>
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
                      sellerId={product.sellerId} // Assuming sellerId is the seller's name; change as needed
                      price={product.price}
                      rating={product.rating}
                      reviewCount={product.reviews.length}
                      description={product.description} // Added description
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
