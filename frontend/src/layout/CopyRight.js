import React from "react";
// import Crdd
import Cards from "../assets/img/common/cards.png";

const CopyRight = () => {
  return (
    <>
      <div className="copyright_area">
        <div className="container">
          <div className="row align-items-center">
            <div className="co-lg-6 col-md-6 col-sm-12 col-12">
              <div className="copyright_left">
                <p>Copyright © 2024 All Rights Reserved</p>
              </div>
            </div>
            <div className="co-lg-6 col-md-6 col-sm-12 col-12">
              <div className="copyright_right">
                <img src={Cards} alt="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CopyRight;
