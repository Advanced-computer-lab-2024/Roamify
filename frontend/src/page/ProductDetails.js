import React, { useEffect, useState } from "react";
import axios from "axios";
// Import Common Banner
import CommonBanner from "../component/Common/CommonBanner";
// Import productDefault image
import productDefault from "../component/TouristProducts/productdefault.png";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/product", {
          withCredentials: true, // Include credentials with the request
        });

        // Log the response to inspect its structure
        console.log("API Response:", response.data);

        // Check if response.data has a products array
        if (response.data && Array.isArray(response.data.products)) {
          const foundProduct = response.data.products.find((prod) => prod._id.toString() === id);
          setProduct(foundProduct); // Set the found product in the state
        } else {
          // Handle case where response.data.products is not an array
          setError("Product data is not in the expected format.");
        }
      } catch (err) {
        console.error("Error fetching product details:", err); // Log the error for debugging
        setError("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  // Display loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Display error if fetching failed
  if (error) {
    return <p>{error}</p>;
  }

  // Check if the product exists
  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <>
      <CommonBanner heading="Product Details" pagination="Product Details" />
      <section id="product_details_main" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="product_details_leftside_wrapper">
                <div className="product_details_heading_wrapper">
                  <div className="product_details_top_heading">
                    <h2>{product.name}</h2>
                    <h5>
                      <i className="fas fa-user"></i> Seller: {product.sellerId}
                    </h5>
                  </div>
                  <div className="product_details_top_heading_right">
                    <h4>${product.price}</h4>
                    <h6>Rating: {product.rating}</h6>
                    <p>({product.reviews.length} reviews)</p>
                  </div>
                </div>
                <div className="product_details_img_wrapper">
                  <div className="product_react_big">
                    <img 
                      src={product.picture.length > 0 ? product.picture[0] : productDefault} 
                      alt={product.name} 
                      className="img-fluid" 
                    />
                  </div>
                </div>
                <div className="product_details_boxed">
                  <h3 className="heading_theme">Overview</h3>
                  <div className="product_details_boxed_inner">
                    <p>{product.description}</p>
                  </div>
                </div>
                <div className="product_details_boxed">
                  <h3 className="heading_theme">Product Features</h3>
                  <div className="product_details_boxed_inner">
                    <ul>
                      {/* Assuming product features are available in an array called 'features' */}
                      {product.features && product.features.map((feature, index) => (
                        <li key={index}>
                          <i className="fas fa-circle"></i> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Additional details can go here, such as customer reviews */}
                <div className="product_details_boxed">
                  <h3 className="heading_theme">Customer Reviews</h3>
                  <div className="product_details_boxed_inner">
                    {product.reviews.length > 0 ? (
                      product.reviews.map((review, index) => (
                        <div key={index} className="review_item">
                          <h5>{review.user}</h5>
                          <p>{review.comment}</p>
                          <h6>Rating: {review.rating}</h6>
                        </div>
                      ))
                    ) : (
                      <p>No reviews yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Optionally, you could add a sidebar component here */}
            <div className="col-lg-4">
              {/* <SideBar /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
