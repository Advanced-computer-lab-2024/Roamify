import React from "react";
// import Common Banner
import CommonBanner from "../component/Common/CommonBanner";
// import TourDetails
import TourDetailsArea from "../component/TourDetails";
import { ExploreData } from "../component/Common/CommonCard/Data";
import { useParams } from "react-router-dom";

const TourDetails = () => {
  const { id } = useParams();
  console.log(id);

  const product = ExploreData.find((tour) => tour.id.toString() === id);

  return (
    <>
      <CommonBanner heading="Product Details" pagination="Product Details" />
      <TourDetailsArea
        price={product.price}
        rating={product.reviewRating}
        description={product.location}
        reviews={product.reviewCount}
      />
    </>
  );
};

export default TourDetails;
