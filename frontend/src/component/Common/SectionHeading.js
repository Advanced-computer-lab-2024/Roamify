import React from "react";

const SectionHeading = (props) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="section_heading_center">
            <h2>{props.heading}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionHeading;
