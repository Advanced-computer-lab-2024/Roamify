import React from "react";

const Dot = React.memo(({ sectionId, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        backgroundColor: isActive ? "var(--main-color)" : "#CCCCCC",
        cursor: "pointer",
        transition: "background-color 0.3s",
      }}
    />
  );
});

export default Dot;
