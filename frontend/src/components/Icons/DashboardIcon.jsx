import React from "react";

const DashboardIcon = ({
  width = "20",
  height = "20",
  fill = "white",
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      fill={fill}
      className={className}
    >
      <path d="M80-120v-80h800v80H80Zm40-120v-280h120v280H120Zm200 0v-480h120v480H320Zm200 0v-360h120v360H520Zm200 0v-600h120v600H720Z" />
    </svg>
  );
};

export default DashboardIcon;
