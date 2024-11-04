import React, { useState, useEffect } from "react";
// Import usepArams
// import { useParams } from 'react-router-dom'
// import Sectin Heading
import SectionHeading from "../../../component/Common/SectionHeading";
// import Common Card
import CommonCard from "../../../component/Common/CommonCard";
// import  ExploreData
import { ExploreData } from "../../../component/Common/CommonCard/Data";

import axios from "axios";
import ProductCard from "./ProductCard";
import AddProductButton from "./AddProductButton";

const ProductsListArea = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [name, setName] = useState("");
  const [ratingSort, setRatingSort] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/product`, {
          params: {
            minPrice: minPrice || 0,
            maxPrice: maxPrice || Infinity,
            name: name || "",
            order: ratingSort,
          },
          withCredentials: true,
        });
        setProducts(response.data.products);
        console.log(response.data.products);
      } catch (error) {
        console.error("Error fetching users:", error);

        // Check if the error response status is 404
        if (error.response && error.response.status === 404) {
          setProducts([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [minPrice, maxPrice, name, ratingSort]);

  // console.log(products[0].picture[0].url);
  return (
    <>
      <section id="explore_area" className="section_padding">
        <div className="container">
          <SectionHeading heading={`${products.length} Products found`} />
          <div className="row">
            <div className="col-lg-3">
              <div className="left_side_search_area">
                <div className="left_side_search_boxed">
                  <div className="left_side_search_heading">
                    <h5>Search by name</h5>
                  </div>
                  <div className="name_search_form">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g Deluxe bus"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <i className="fas fa-search"></i>
                  </div>
                </div>
                <div className="left_side_search_boxed">
                  <div className="left_side_search_heading">
                    <h5>Price</h5>
                  </div>
                  <div
                    className="price_filter_form"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px", // Adjust the spacing between elements as needed
                      marginTop: "2vh",
                    }}
                  >
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Min"
                      min="0"
                      onChange={(e) => setMinPrice(e.target.value)}
                      style={{ flex: "1" }} // Optional: Makes the input boxes flexible
                    />
                    <span
                      className="price_filter_to"
                      style={{
                        margin: "0 5px", // Adjust margins if you need more or less space
                      }}
                    >
                      to
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Max"
                      min="0"
                      onChange={(e) => setMaxPrice(e.target.value)}
                      style={{ flex: "1" }} // Optional: Makes the input boxes flexible
                    />
                  </div>
                </div>
                <div className="left_side_search_boxed">
                  <div className="left_side_search_heading">
                    <h5>Rating</h5>
                  </div>
                  <div
                    className="rating_sort_options"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px", // Adjust gap between options
                      marginTop: "2vh",
                    }}
                  >
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#333", // Text color
                      }}
                    >
                      <input
                        type="radio"
                        name="ratingSort"
                        value="highToLow"
                        onChange={() => setRatingSort("highToLow")}
                        style={{
                          // appearance: "none", // Remove default radio styling
                          width: "20px",
                          height: "20px",
                          border: "2px solid #333",
                          borderRadius: "4px", // Make it square with rounded corners
                          marginRight: "10px", // Space between the square and the label
                          cursor: "pointer",
                          position: "relative",
                        }}
                      />
                      High to Low
                    </label>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#333", // Text color
                      }}
                    >
                      <input
                        type="radio"
                        name="ratingSort"
                        value="lowToHigh"
                        onChange={() => setRatingSort("lowToHigh")}
                        style={{
                          // appearance: "none", // Remove default radio styling
                          appearance: "square-button",
                          width: "20px",
                          height: "20px",
                          border: "2px solid #333",
                          borderRadius: "4px", // Make it square with rounded corners
                          marginRight: "10px", // Space between the square and the label
                          cursor: "pointer",
                          position: "relative",
                        }}
                      />
                      Low to High
                    </label>
                  </div>
                </div>
                <AddProductButton />
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row">
                {isLoading ? ( // Check if data is still loading
                  <p>Loading products...</p>
                ) : products.length > 0 ? ( // Check if there are products
                  products.map((product, index) => (
                    <ProductCard
                      id={product._id}
                      img={product.picture[0]?.url || ""}
                      name={product.name}
                      price={product.price}
                      quantity={product.quantity}
                      description={product.description}
                      discount={product.discount}
                      discountPrice={product.discountPrice}
                      reviewRating={product.reviewRating}
                      reviewCount={product.reviewCount}
                      key={index}
                      grid={true}
                    />
                  ))
                ) : (
                  <p>No products found.</p> // Message when there are no products
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsListArea;
