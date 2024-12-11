import React from "react";
// import Link
import { Link } from "react-router-dom";
// import img
import img1 from "../../../assets/img/offer/offer1.png";
import img2 from "../../../assets/img/offer/offer2.png";
import img3 from "../../../assets/img/offer/offer3.png";

const SpecialOffer = () => {
  return (
    <>
      <section
        id="offer_area"
        className="section_padding_top"
        style={{ backgroundColor: "var(--background-color)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="offer_area_box d-none-phone img_animation">
                <img src={img1} alt="img" />
                <div className="offer_area_content">
                  <h2>Special Offers</h2>
                  <p>
                  "Explore and perfectly designed itineraries for enjoyment and recreation. 
                  Discover incredible places and unique experiences, filled with joy and relaxation. 
                  Choose and book with ease, complete confidence, and simplicity. 
                  Live in moments full of joy and everlasting memories."
                  </p>
                  <Link to="#!" className="btn btn_theme btn_md">
                    Holiday deals
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="offer_area_box img_animation">
                <img src={img2} alt="img" />
                <div className="offer_area_content">
                  <h2>News letter</h2>
                  <p>
                  "Engage in work and significant discomfort was upon them, yet immense delight prevailed. 
                  Indeed, they are."
                  </p>
                  <Link to="#!" className="btn btn_theme btn_md">
                    Subscribe now
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 col-12">
              <div className="offer_area_box img_animation">
                <img src={img3} alt="img" />
                <div className="offer_area_content">
                  <h2>Travel tips</h2>
                  <p>
                  "Embark on journeys where labor turns into delight and grand adventures await, yet true satisfaction unfolds. 
                   Indeed, they and their experiences."
                  </p>
                  <Link to="#!" className="btn btn_theme btn_md">
                    Get tips
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SpecialOffer;
