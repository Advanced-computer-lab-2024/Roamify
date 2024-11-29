import React from "react";
import ApexCharts from "react-apexcharts";

const Chart = () => {
  return (
    <section style={{}}>
      <ApexCharts
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
        width={"50%"}
      />
    </section>
  );
};

const chartOptions = {
  chart: {
    id: "basic-bar",
    background: "transparent",
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  },
  fill: {
    colors: ["#f44336"],
  },
};

const chartSeries = [
  {
    name: "Sales",
    data: [30, 40, 35, 50, 49, 60, 70],
  },
];

export default Chart;
