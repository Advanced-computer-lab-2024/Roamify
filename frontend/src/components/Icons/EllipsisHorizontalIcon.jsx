import React from "react";

const EllipsisHorizontalIcon = ({
  width = "20",
  height = "20",
  fill = "white",
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      fill={fill}
      className="ionicon ml-auto"
      viewBox="0 0 512 512"
    >
      <circle cx="256" cy="256" r="48" />
      <circle cx="416" cy="256" r="48" />
      <circle cx="96" cy="256" r="48" />
    </svg>
  );
};

export default EllipsisHorizontalIcon;
