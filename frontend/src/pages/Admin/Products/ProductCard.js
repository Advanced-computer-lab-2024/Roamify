import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteButton from "../Activities/DeleteButton";
import EditProductButton from "./EditProductButton";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Import the toast function
import { renderStars } from "../../../functions/renderStars";

const ProductCard = (props) => {
  const [isArchived, setIsArchived] = useState(props.isArchived); // State to manage archiving status

  // Function to handle archiving/unarchiving
  const handleArchiveToggle = async () => {
    try {
      const apiUrl = isArchived
        ? `http://localhost:3000/api/product/unarchive/${props.id}` // Unarchive API
        : `http://localhost:3000/api/product/archive/${props.id}`; // Archive API

      const response = await axios.post(apiUrl, {}, { withCredentials: true });

      setIsArchived(!isArchived);
      toast.success(response.data.message); // Show success toast
    } catch (error) {
      console.error("Error archiving/unarchiving product:", error);
      toast.error("There was an error with archiving/unarchiving."); // Show error toast
    }
  };

  // Function to render stars based on review rating

  return (
    <>
      <div
        className={
          props.grid === true
            ? "col-lg-4 col-md-6 col-sm-6 col-12"
            : "col-lg-3 col-md-6 col-sm-6 col-12"
        }
      >
        <Toaster />
        <div
          className="theme_common_box_two img_hover"
          style={{ border: "1px solid var(--secondary-border-color)" }}
        >
          <div className="theme_two_box_img">
            <Link to={`/product-details/${props.id}`}>
              <img
                style={{
                  height: "30vh",
                  objectFit: "cover",
                }}
                src={props.img}
                alt="Product"
              />
            </Link>

            {props.discount && (
              <div className="discount_tab">
                <span>{props.discountPrice}</span>
              </div>
            )}
          </div>
          <div
            className="theme_two_box_content"
            style={{ background: "var(--secondary-color)" }}
          >
            <h4>
              <Link
                to={`/product-details/${props.id}`}
                style={{ color: "var(--text-color)" }}
              >
                {props.name}
              </Link>
            </h4>
            <p>
              <span className="review-rating">{renderStars(props.rating)}</span>
              <span
                className="review-count"
                style={{
                  marginLeft: "10px",
                  color: "var(--dashboard-title-color)",
                }}
              >
                ({props.reviews == null ? 0 : props.reviews.length} reviews)
              </span>
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3>${props.price}</h3>
              <div
                style={{
                  marginTop: "2vh",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {props.isAdmin && (
                  <>
                    <EditProductButton
                      itemId={props.id}
                      name={props.name}
                      price={props.price}
                      quantity={props.quantity}
                      description={props.description}
                      img={props.img}
                      fetchProducts={props.fetchProducts}
                    />
                    <button
                      onClick={handleArchiveToggle}
                      style={{
                        borderRadius: "5px",
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        height: "7vh",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <i className="fas fa-archive"></i>
                      {isArchived ? "Unarchive" : "Archive"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
