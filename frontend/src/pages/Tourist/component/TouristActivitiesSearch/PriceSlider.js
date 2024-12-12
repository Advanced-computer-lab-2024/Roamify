// PriceSlider.js
import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceSlider = ({ onApply }) => {
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const handleSliderChange = (value) => {
    setPriceRange(value);
  };

  const handleApplyClick = () => {
    onApply(priceRange); // Pass priceRange to the parent on apply
  };

  return (
    <div>
      <p>
        {priceRange[0]}  - {priceRange[1]} 
      </p>
      <Slider
        range
        min={0}
        max={10000}
        defaultValue={[100, 500]}
        onChange={handleSliderChange}
        value={priceRange}
        trackStyle={[{ backgroundColor: "var(--main-color)" }]}
        handleStyle={[
          { borderColor: "var(--main-color)" },
          { borderColor: "var(--main-color)" },
        ]}
      />
      <button className="apply" type="button" onClick={handleApplyClick}>
        Apply
      </button>
    </div>
  );
};

export default PriceSlider;
