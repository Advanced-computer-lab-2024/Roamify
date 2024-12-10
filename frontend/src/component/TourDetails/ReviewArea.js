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
          <div className="col-lg-8">
            <div
              className="write_your_review_wrapper"
              style={{ background: "var(--secondary-color)" }}
            >
              <h3
                className="heading_theme"
                style={{ color: "var(--text-color)" }}
              >
                Write your review
              </h3>
              <div className="write_review_inner_boxed">
                <form action="!#" id="news_comment_form">
                  <div className="row">
                    {/* Star Rating Selector */}
                    <div className="star_rating_input">
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`fas fa-star ${
                            index < rating ? "selected" : ""
                          }`}
                          onClick={() => handleRatingSelect(index + 1)}
                        />
                      ))}
                    </div>
                    <div className="col-lg-12">
                      <div className="form-froup">
                        <textarea
                          rows="6"
                          placeholder="Write your comments"
                          className="form-control bg_input"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          style={{
                            background: "var(--background-color)",
                            border: "1px solid var(--secondary-border-color)",
                            resize: "none",
                          }}
                        ></textarea>
                      </div>
                      <div className="comment_form_submit">
                        <button className="btn btn_theme btn_md">
                          Post comment
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
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
