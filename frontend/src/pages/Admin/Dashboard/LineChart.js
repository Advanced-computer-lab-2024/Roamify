import React from "react";
import ApexCharts from "react-apexcharts";

const LineChart = ({ seriesName, seriesData, xValues }) => {
  const chartOptions = {
    chart: {
      id: "basic-area", // Chart ID
      background: "transparent",
      toolbar: {
        show: false, // Hides the toolbar (optional)
      },
    },
    xaxis: {
      categories: xValues, // Categories (months in this case)
    },
    stroke: {
      curve: "smooth", // Smooth line
      width: 1, // Line width
      colors: ["var(--chart-blue)"],
    },
    fill: {
      type: "gradient", // Set the fill type to 'gradient'
      gradient: {
        shade: "light", // Set the shade to light for the gradient
        type: "vertical", // Horizontal gradient (you can change to 'vertical' if preferred)
        gradientToColors: ["var(--chart-blue)"], // Gradient end color
        opacityFrom: 0.7, // Starting opacity
        opacityTo: 0, // Ending opacity (0 for full fade)
        stops: [0, 100], // Stops of the gradient, where 0 is the start and 100 is the end
      },
    },
    markers: {
      size: 0, // Size of markers on the line
      colors: ["var(--chart-blue)"], // Color of markers
      strokeColor: "#ffffff", // Stroke color for markers
      strokeWidth: 0, // Stroke width for markers
    },
    grid: {
      show: true, // Show grid lines
      borderColor: "var(--secondary-color)", // Grid line color
    },
    tooltip: {
      enabled: true, // Enable tooltips
      theme: "dark", // Tooltip theme (dark/light)
      fillSeriesColor: false,
    },
    dataLabels: {
      enabled: false, // Disable data labels on the chart (the labels on the line itself)
    },
  };

  const chartSeries = [
    {
      name: seriesName,
      data: seriesData, // Data for the area chart
    },
  ];
  return (
    <section style={{ height: "100%" }}>
      <ApexCharts
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={"100%"}
        width={"100%"}
      />
    </section>
  );
};

export default LineChart;
