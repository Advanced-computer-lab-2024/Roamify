import React from "react";

const GuideCard = (props) => {
  return (
    <>
      <div className="col-lg-3 col-md-6 col-sm-12 col-12">
        <div className="tour_guides_boxed">
          <img src={props.img} alt="img" />
          <div className="tour_guide_content">
            <ul>
              <li>
                <a href="!#">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="!#">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="!#">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="!#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
            <h3>{props.name}</h3>
            <p>{props.des}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideCard;
