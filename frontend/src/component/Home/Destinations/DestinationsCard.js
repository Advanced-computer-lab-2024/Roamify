import React from "react";
// import Link
import { Link } from "react-router-dom";

const DestinationsCard = (props) => {
  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
        <div className="tab_destinations_boxed">
          <div className="tab_destinations_img">
            <a href="top-destinations.html">
              <img
                src={props.img}
                alt="img"
              />
            </a>
          </div>
          <div className="tab_destinations_conntent">
            <h3>
              <Link to="/destinations-details">{props.heading}</Link>
            </h3>
            <p>
              Price starts at <span>{props.price}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationsCard;
