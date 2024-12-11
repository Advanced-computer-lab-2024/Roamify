import React from "react";
import ProfileIcon from "../../Icons/ProfileIcon";
import { renderStars } from "../../../functions/renderStars";

const ReviewCard = (props) => {
  return (
    <>
      <div className="col-lg-4 col-md-6">
        <div
          className="all_review_box"
          style={{ background: "var(--secondary-color)" }}
        >
          <div className="all_review_date_area">
            <div className="all_review_star">{renderStars(props.rating)}</div>
          </div>
          <div
            className="all_review_text"
            style={{ color: "var(--dashoard-title-color)" }}
          >
            <ProfileIcon height="80px" width="80px" fill="var(--text-color)" />
            <h4 style={{ color: "var(--dashoard-title-color)" }}>
              {props.name}
            </h4>
            <span style={{ color: "var(--dashoard-title-color)" }}>
              {props.des}
            </span>
            <p style={{ color: "var(--dashoard-title-color)" }}>
              {" "}
              {props.review}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
