import React from "react";
import { TopDestinationsData } from "./Data";
import SectionHeading from "../../Common/SectionHeading";
import BigImg from "../../../assets/img/destination/big-img.png";
import { Link } from "react-router-dom";

const TopDestinations = () => {
  return (
    <>
      <section id="top_destinations" className="section_padding_top">
        <div className="container">
          <SectionHeading heading="Top destinations" />
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="destinations_content_box img_animation">
                <img src={BigImg} alt="img" />
                <div className="destinations_content_inner">
                  <h2>Up to</h2>
                  <div className="destinations_big_offer">
                    <h1>50</h1>
                    <h6>
                      <span>%</span> <span>Off</span>
                    </h6>
                  </div>
                  <h2>Holiday packages</h2>
                  <Link to="#!" className="btn btn_theme btn_md">
                    Book now
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                  {TopDestinationsData.slice(0, 3).map(data => 
                    <div className="destinations_content_box img_animation" key={data.id}>
                    <Link to="#!">
                      <img
                        src={data.img}
                        alt="img"
                      />
                    </Link>
                    <div className="destinations_content_inner">
                      <h3>
                        <Link href="#!">{data.heading}</Link>
                      </h3>
                    </div>
                  </div>
                  )}
                  
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                  {TopDestinationsData.slice(3, 6).map(data1 => 
                     <div className="destinations_content_box img_animation" key={data1.id}>
                     <Link to="#!">
                       <img
                         src={data1.img}
                         alt="img"
                       />
                     </Link>
                     <div className="destinations_content_inner">
                       <h3>
                         <Link to="#!">{data1.heading}</Link>
                       </h3>
                     </div>
                   </div>
                  )}
                 
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                  {TopDestinationsData.slice(6, 8).map(data2 => 
                      <div
                        className="destinations_content_box img_animation"
                        key={data2.id}
                      >
                        <Link href="top-destinations.html">
                          <img src={data2.img} alt="img" />
                        </Link>
                        <div className="destinations_content_inner">
                          <h3>
                            <Link href="top-destinations.html">{data2.heading}</Link>
                          </h3>
                        </div>
                      </div>
                  )}

                  <div className="destinations_content_box">
                    <Link
                      href="top-destinations.html"
                      className="btn btn_theme btn_md w-100"
                    >
                      View all
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopDestinations;
