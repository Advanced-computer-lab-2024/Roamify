import React from "react";
import CommonBanner from "../../component/Common/CommonBanner";
import Form from "./component/TouristComplain/Form";
const TouristComplain = () => {
  return (
    <>
      <CommonBanner heading="Complains" pagination="Complains" />
      <Form />
    </>
  );
};

export default TouristComplain;
