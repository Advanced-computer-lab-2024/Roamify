import React from "react";
// import section heading
import SectionHeading from "../../Common/SectionHeading";
// import TourData
import { ExploreData } from "../../Common/CommonCard/Data";
// import Tour Card
import PromotionalCard from "./PromotionalCard";
//  OwlCarousel Slider Import
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const PromotionalTours = () => {
  let responsive = {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    960: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  };
  return (
    <>
      <section id="promotional_tours" className="section_padding_top">
        <div className="container">
          <SectionHeading heading="Our best promotional tours" />

          <div className="row">
            <div className="col-lg-12">
              <div className="promotional_tour_slider  dot_style">
                <OwlCarousel
                  className="owl-theme"
                  responsive={responsive}
                  autoplay={false}
                  autoplayHoverPause={true}
                  autoplayTimeout={2500}
                  loop={true}
                  margin={10}
                  nav={false}
                  dots={true}
                >
                  {ExploreData.map((data, index) => (
                    <PromotionalCard
                      img={data.img}
                      heading={data.heading}
                      location={data.location}
                      discount={data.discount}
                      discountPrice={data.discountPrice}
                      reviewRating={data.reviewRating}
                      reviewCount={data.reviewCount}
                      price={data.price}
                      key={index}
                    />
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PromotionalTours;
