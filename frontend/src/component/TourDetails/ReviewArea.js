import React, { useState } from "react";
// Import ReviewCard
import ReviewCard from "../Common/CustomerReview/ReviewCard";
// Import ReviewData
import { ReviewData } from "../Common/CustomerReview/ReviewData";

const ReviewArea = ({ reviews }) => {
  const [rating, setRating] = useState(0); // Stores the user's selected star rating
  const [comment, setComment] = useState(""); // Stores the user's comment text

  // Function to handle star rating selection
  const handleRatingSelect = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-8"></div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="all_review_wrapper">
              <h3
                className="heading_theme"
                style={{ color: "var(--text-color)" }}
              >
                All reviews
              </h3>
            </div>
          </div>
          {reviews && reviews.length == 0
            ? "no reviews for this product"
            : reviews.map((data, index) => (
                <ReviewCard
                  review={data.review}
                  rating={data.rating}
                  key={index}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default ReviewArea;
