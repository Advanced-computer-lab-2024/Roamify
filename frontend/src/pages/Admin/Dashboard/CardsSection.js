import React from "react";
import StatsCard from "./StatsCard";
import LineChart from "./LineChart";
import DashboardCard from "./DashboardCard";

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
        <DashboardCard
          height={"50vh"}
          width={"50%"}
          title={"Total Revenue"}
          titlePosition={"left"}
          body={<LineChart />}
        />
      </section>
    </div>
  );
};

export default CardsSection;
