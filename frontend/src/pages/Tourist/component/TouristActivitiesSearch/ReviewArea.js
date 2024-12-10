import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ReviewArea = ({ itineraryId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Function to handle star rating selection
  const handleRatingSelect = (selectedRating) => {
    setRating(selectedRating);
    setFeedbackMessage("");
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedbackMessage("");

    try {
      if (rating && comment) {
        await axios.post(
          `http://localhost:3000/api/tourist/review/rate/activity/${itineraryId}`,
          { rating },
          { withCredentials: true }
        );
        await axios.post(
          `http://localhost:3000/api/tourist/review/comment/activity/${itineraryId}`,
          { comment },
          { withCredentials: true }
        );
        toast.success("Rating submitted successfully. ");
      }


      if (!rating || !comment) {
        toast.error("Please provide a rating or a comment.");
      }
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    }
    console.log("Activity ID:", itineraryId);
    // Reset form fields after submission
    setRating(0);
    setComment("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div className="write_your_review_wrapper" style={{ background: "var(--secondary-color)"  }}>
            <h3 className="heading_theme">Write your review</h3>
            <div className="write_review_inner_boxed">
              <form id="news_comment_form" onSubmit={handleSubmit}>
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
                        style={{
                          color: index < rating ? "#FFD700" : "#ccc",
                          cursor: "pointer",
                        }} // Adds color to selected stars
                      />
                    ))}
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        rows="6"
                        placeholder="Write your comments"
                        className="form-control bg_input"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="comment_form_submit">
                      <button type="submit" className="btn btn_theme btn_md">
                        Post Review
                      </button>
                      {feedbackMessage && (
                        <p className="feedback-message">{feedbackMessage}</p>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ReviewArea;
