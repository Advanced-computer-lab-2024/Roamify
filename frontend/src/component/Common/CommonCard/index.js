import React from "react";
// Import Link
import { Link } from "react-router-dom";

const CommonCard = (props) => {
  return (
    <>
      <div
        className={
          props.grid === true
            ? "col-lg-4 col-md-6 col-sm-6 col-12"
            : "col-lg-3 col-md-6 col-sm-6 col-12"
        }
      >
        <div
          className="theme_common_box_two img_hover"
          style={{ border: "1px solid var(--secondary-border-color)" }}
        >
          <div className="theme_two_box_img">
            <Link to={`/tourist/hotels`}>
              <img src={props.img} alt="img" />
            </Link>

            {props.discount === true ? (
              <div className="discount_tab">
                <span>{props.discountPrice}</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div
            className="theme_two_box_content"
            style={{
              background: "var(--secondary-color)",
              color: "var(--text-color)",
            }}
          >
            <h4>
              <Link to={`/tourist/hotels`}>{props.name}</Link>
            </h4>
            <p>
              <span className="review_rating">{props.reviewRating}</span>
              <span className="review_count">{props.reviewCount}</span>
            </p>
            <h3
              style={{
                color: "var(--text-color)",
              }}
            >
              {props.price} <span>Price starts from</span>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonCard;
