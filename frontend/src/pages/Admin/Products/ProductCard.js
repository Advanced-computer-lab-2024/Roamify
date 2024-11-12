import React from "react";
// Import Link
import { Link } from "react-router-dom";
import DeleteButton from "../Activities/DeleteButton";
import EditProductButton from "./EditProductButton";
import axios from "axios";

const ProductCard = (props) => {
  return (
    <>
      <div
        className={
          props.grid === true
            ? "col-lg-4 col-md-6 col-sm-6 col-12"
            : "col-lg-3 col-md-6 col-sm-6 col-12"
        }
      >
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
              <div style={{ marginLeft: "auto" }}>
                {props.isAdmin && (
                  <EditProductButton
                    itemId={props.id}
                    name={props.name}
                    price={props.price}
                    quantity={props.quantity}
                    description={props.description}
                    img={props.img}
                  />
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
