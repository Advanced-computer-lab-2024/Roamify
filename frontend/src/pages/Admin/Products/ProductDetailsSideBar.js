import React from "react";
import { renderStars } from "../../../functions/renderStars";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

const ProductDetailsSideBar = ({
  name,
  price,
  rating,
  quantity,
  description,
}) => {
  const { id } = useParams();
  const handleAddToCart = async () => {
    try {
      console.log("hey");
      const response = await axios.post(
        `http://localhost:3000/api/cart/product`,
        {
          productId: id,
        },
        { withCredentials: true } // Ensure credentials are sent for authentication
      );

      // Check the response JSON

      toast.success(response.data.message || "Could not add item to cart.");
    } catch (error) {
      // Extract and display API error message
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    }
  };
  return (
    <>
      <div className="tour_details_right_sidebar_wrapper">
        <div className="tour_detail_right_sidebar">
          <div
            className="tour_details_right_boxed"
            style={{ background: "var(--secondary-color)" }}
          >
            <div className="tour_package_bar_price">
              <h6 style={{ fontSize: "1.5rem" }}>{"$ " + price}</h6>
            </div>

            {/* Displaying the rating */}
            <div className="tour_package_details_bar_list">
              {renderStars(rating)}
            </div>

            {/* Stock Status */}
            <div
              style={{
                marginTop: "15px",
                fontWeight: "bold",
                color: quantity > 0 ? "green" : "red",
                fontSize: "1rem",
              }}
            >
              {quantity > 0 ? "In Stock" : "Out of Stock"}
            </div>
          </div>

          <div className="" style={{ marginTop: "20px" }}>
            <button
              className="btn btn_theme btn_md w-100"
              style={{
                borderRadius: "10px",
                backgroundColor: quantity > 0 ? "#8b3eea" : "#ccc",
                cursor: quantity > 0 ? "pointer" : "not-allowed",
              }}
              disabled={quantity <= 0}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsSideBar;
