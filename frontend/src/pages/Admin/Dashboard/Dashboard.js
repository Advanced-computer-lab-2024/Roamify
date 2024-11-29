import React from "react";
import ApexCharts from "react-apexcharts";
import StatsCard from "./StatsCard";
import CardsSection from "./CardsSection";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        boxSizing: "border-box",
        backgroundColor: "var(--background-color)",
        flex: 1,
        padding: "10px",
        margin: "0px 40px",
      }}
    >
      <CardsSection />
    </div>
  );
};

export default Dashboard;
