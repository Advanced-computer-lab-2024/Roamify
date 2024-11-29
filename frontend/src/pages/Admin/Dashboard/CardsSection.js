import React from "react";
import StatsCard from "./StatsCard";
import Chart from "./Chart";

const CardsSection = () => {
  return (
    <div style={{ flex: 1, padding: "10px" }}>
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <StatsCard title="Total Sales" value="$3,245" />
        <StatsCard title="Total Revenue" value="$7,892" />
        <StatsCard title="Users" value="125" />
      </section>
      <section style={{ marginTop: "40px" }}>
        <Chart />
      </section>
    </div>
  );
};

export default CardsSection;
