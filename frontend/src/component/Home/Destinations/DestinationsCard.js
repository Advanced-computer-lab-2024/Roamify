import React from "react";
// import Link
import { Link } from "react-router-dom";

const DestinationsCard = (props) => {
  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-12 col-12">
        <div
          className="tab_destinations_boxed"
          style={{ border: "1px solid var(--secondary-border-color)" }}
        >
          <div className="tab_destinations_img">
            <a href="/tourist">
              <img src={props.img} alt="img" />
            </a>
          </div>
          <div className="tab_destinations_conntent">
            <h3>
              <Link
                to="/destinations-details"
                style={{ color: "var(--text-color)" }}
              >
                {props.heading}
              </Link>
            </h3>
            <p style={{ color: "var(--dashboard-title-color)" }}>
              Price starts at <span>{props.price}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationsCard;
