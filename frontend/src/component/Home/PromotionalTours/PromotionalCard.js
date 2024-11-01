import React from 'react'
// Import Link
import { Link } from "react-router-dom";
const PromotionalCard = (props) => {
  return (
    <>
     <div className="theme_common_box_two img_hover">
          <div className="theme_two_box_img">
            <Link to="#!">
              <img src={props.img} alt="img" />
            </Link>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              {props.location}
            </p>
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
              <Link to="#!">{props.heading}</Link>
            </h4>
            <p>
              <span className="review_rating">{props.reviewRating}</span>
              <span className="review_count">{props.reviewCount}</span>
            </p>
            <h3>
              {props.price} <span>Price starts from</span>
            </h3>
          </div>
        </div>
    </>
  )
}

export default PromotionalCard