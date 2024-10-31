import React from "react";

const ReviewCard = (props) => {
  return (
    <>
      <div className="col-lg-4 col-md-6">
        <div className="all_review_box">
          <div className="all_review_date_area">
            <div className="all_review_date">
              <h5>{props.date}</h5>
            </div>
            <div className="all_review_star">
              <h5>{props.status}</h5>
              <div className="review_star_all">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
          </div>
          <div className="all_review_text">
            <img src={props.img} alt="img" />
            <h4>{props.name}</h4>
            <span>{props.des}</span>
            <p>
                {props.para}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
