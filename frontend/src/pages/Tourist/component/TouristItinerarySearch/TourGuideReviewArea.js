import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ReviewArea = ({ fetchTourGuides, tourGuideId, closeModal }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showReviewArea, setShowReviewArea] = useState(true);

  // Toggle review area visibility
  const toggleReviewArea = () => {
    setShowReviewArea(!showReviewArea);
  };

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
      if (rating) {
        await axios.post(
          `http://localhost:3000/api/tourist/review/rate/tour-guide/${tourGuideId}`,
          { rating },
          { withCredentials: true }
        );
      }

      if (comment) {
        await axios.post(
          `http://localhost:3000/api/tourist/review/comment/tour-guide/${tourGuideId}`,
          { comment },
          { withCredentials: true }
        );
        setFeedbackMessage((prev) => prev + "Comment submitted successfully.");
      }

      if (!rating && !comment) {
        setFeedbackMessage("Please provide a rating or a comment.");
      }
    } catch (error) {
      setFeedbackMessage("Failed to submit review. Please try again.");
    }

    // Reset form fields after submission
    fetchTourGuides();
    toast.success("Review submitted successfully!");
    closeModal(null);
    setRating(0);
    setComment("");
  };

  return (
    <div
      className="popup-container"
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1000",
      }}
    >
      <div
        className="write_your_review_wrapper"
        style={{
          textAlign: "center",
          position: "relative",
          height: "55vh",
          width: "40vw",
          background: "var(--secondary-color)",
        }}
      >
        <button
          onClick={() => closeModal(null)}
          className="close-button"
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "var(--text-color)",
          }}
        >
          &times;
        </button>
        <h3
          className="heading_theme"
          style={{
            fontSize: "22px",
            color: "#333",
            marginBottom: "20px",
            color: "var(--text-color)",
          }}
        >
          Write your review
        </h3>
        <div
          className="write_review_inner_boxed"
          style={{
            padding: "10px",
          }}
        >
          <form
            id="news_comment_form"
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <div
              className="star_rating_input"
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              {[...Array(5)].map((_, index) => (
                <i
                  key={index}
                  className={`fas fa-star ${index < rating ? "selected" : ""}`}
                  onClick={() => handleRatingSelect(index + 1)}
                  style={{
                    fontSize: "24px",
                    color: index < rating ? "var(--main-color)" : "#ccc",
                    cursor: "pointer",
                    margin: "0 5px",
                  }}
                />
              ))}
            </div>
            <div
              className="form-group"
              style={{
                marginBottom: "15px",
              }}
            >
              <textarea
                rows="6"
                placeholder="Write your comments"
                className="form-control bg_input"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid var(--secondary-border-color)",
                  fontSize: "16px",
                  resize: "none",
                  background: "var(--background-color)",
                }}
              ></textarea>
            </div>
            <div
              className="comment_form_submit"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button
                type="submit"
                className="btn btn_theme btn_md"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#8b3eea",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Post Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewArea;
