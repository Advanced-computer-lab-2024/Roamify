import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteButton from "../Activities/DeleteButton";
import EditProductButton from "./EditProductButton";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // Import the toast function

const ProductCard = (props) => {
  const [isArchived, setIsArchived] = useState(props.isArchived); // State to manage archiving status

  // Function to handle archiving/unarchiving
  const handleArchiveToggle = async () => {
    try {
      // Decide which API to call based on current isArchived status
      const apiUrl = isArchived
        ? `http://localhost:3000/api/product/unarchive/${props.id}` // Unarchive API
        : `http://localhost:3000/api/product/archive/${props.id}`; // Archive API

      const response = await axios.post(apiUrl, {}, { withCredentials: true });

      setIsArchived(!isArchived);
      toast.success(response.data.message); // e.g., "Product archived successfully"
    } catch (error) {
      console.error("Error archiving/unarchiving product:", error);
      // Show an error toast
      toast.error("There was an error with archiving/unarchiving.");
    }
  };

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
        <div className="theme_common_box_two img_hover">
          <div className="theme_two_box_img">
            <Link to={`/product-details/${props.id}`}>
              <img
                style={{ height: "30vh", objectFit: "contain" }}
                src={props.img}
                alt="img"
              />
            </Link>

            {props.discount === true ? (
              <div className="discount_tab">
                <span>{props.discountPrice}</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="theme_two_box_content">
            <h4>
              <Link to={`/product-details/${props.id}`}>{props.name}</Link>
            </h4>
            <p>
              <span className="review_rating">{props.reviewRating}</span>
              <span className="review_count">{props.reviewCount}</span>
            </p>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h3>
                {props.price} <span>Price starts from</span>
              </h3>
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
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
                    />
                    <button
                      onClick={handleArchiveToggle}
                      className="btn btn_theme btn_sm"
                      style={{ marginLeft: "10px" }}
                    >
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
