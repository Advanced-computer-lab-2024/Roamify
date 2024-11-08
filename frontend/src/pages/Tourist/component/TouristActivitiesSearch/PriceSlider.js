// PriceSlider.js
import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceSlider = ({ onApply }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

  const handleApplyClick = () => {
    onApply(priceRange); // Pass priceRange to the parent on apply
  };

  return (
    <div>
      <p>
        {priceRange[0]} EGP - {priceRange[1]} EGP
      </p>
      <Slider
        range
        min={0}
        max={1000}
        defaultValue={[100, 500]}
        onChange={handleSliderChange}
        value={priceRange}
        trackStyle={[{ backgroundColor: "#52c41a" }]}
        handleStyle={[{ borderColor: "#52c41a" }, { borderColor: "#52c41a" }]}
      />
    </div>
  );
};

export default PriceSlider;
