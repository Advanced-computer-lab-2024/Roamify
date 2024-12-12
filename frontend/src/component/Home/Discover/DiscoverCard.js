import React from "react";
import { Link } from "react-router-dom";
const DiscoverCard = (props) => {
  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-6 col-12">
        <div className="imagination_boxed">
          <Link to="tourist">
            <img src={props.data.img} alt="img" />
          </Link>
          <h3>
            <Link to="#!">
              {props.data.heading}
              <span>{props.data.span}</span>
            </Link>
          </h3>
        </div>
      </div>
    </>
  );
};

export default DiscoverCard;
