import React, { useState, useEffect } from "react";
import axios from "axios";
import StatsCard from "../../Admin/Dashboard/StatsCard";
import DashboardCard from "../../Admin/Dashboard/DashboardCard";
import LineChart from "../../Admin/Dashboard/LineChart";
import Table from "./Table";

const CardsSection = ({ date }) => {
  const [totalTourists, setTotalTourists] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenueData, setRevenueData] = useState([]);
  const [revenueDate, setRevenueDate] = useState("");
  const [touristsDate, setTouristsDate] = useState("");

  useEffect(() => {
    // Fetching data from your APIs with date as a query parameter
    const fetchRevenueData = async () => {
      try {
        const revenueResponse = await axios.get(
          `http://localhost:3000/api/advertiser/view-revenue`,
          {
            params: { date: date },
            withCredentials: true,
          }
        );
        const formattedRevenueData = revenueResponse?.data?.filteredResults.map(
          (item) => ({
            ...item,
            date: new Date(item.date).toISOString().split("T")[0], // Format date as yyyy-MM-dd
          })
        );
        // setTotalTourists(salesResponse?.data?.totalTourists);
        setTotalRevenue(revenueResponse?.data?.totalRevenue);
        setRevenueData(formattedRevenueData);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    const fetchTouristsData = async () => {
      try {
        const touristsResponse = await axios.get(
          `http://localhost:3000/api/advertiser/view-tourists`,
          {
            params: { date: date },
            withCredentials: true,
          }
        );

        setTotalTourists(salesResponse?.data?.totalTourists);
      } catch (err) {
        setTotalTourists(0);
        console.error("Error fetching data", err);
      }
    };
    fetchTouristsData();
    fetchRevenueData();
  }, [date]);

  console.log(totalRevenue);
  console.log(revenueData);

  return (
    <div style={{ flex: 1, padding: "10px" }}>
      <section
        style={{
          display: "flex",
          gap: "1vw",
          marginBottom: "10px",
        }}
      >
        <StatsCard
          width="50%"
          title="Total Revenue"
          value={`$${totalRevenue}`}
        />
        <StatsCard width="50%" title="Total Tourists" value={totalTourists} />
      </section>
      <section style={{ marginTop: "20px" }}>
        <DashboardCard
          height={"70vh"}
          width={"100%"}
          title={""}
          titlePosition={"left"}
          body={
            <div style={{ height: "100%", width: "100%", display: "flex" }}>
              <DashboardCard
                height={"100%"}
                width={"50%"}
                title={"Total Revenue"}
                titlePosition={"left"}
                body={
                  <LineChart
                    seriesName={"Total Revenue"}
                    seriesData={revenueData.map((item) => item.price)} // assuming each item has 'revenue'
                    xValues={revenueData.map((item) => {
                      const date = new Date(item.date);
                      return date.toLocaleDateString("en-US"); // For American format: MM/DD/YYYY
                    })} // assuming each item has 'date'
                  />
                }
              />
              <div
                style={{
                  height: "100%",
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <DashboardCard
                  height={"50%"}
                  width={"100%"}
                  title={"Total Sales"}
                  titlePosition={"left"}
                  body={
                    <Table
                      fetchedData={revenueData}
                      fetchedColumns={[
                        {
                          Header: "Name",
                          accessor: "name",
                        },
                        {
                          Header: "Count",
                          accessor: "count",
                        },
                        {
                          Header: "Price",
                          accessor: "price",
                        },
                        {
                          Header: "Date",
                          accessor: "date",
                        },
                      ]}
                    />
                  }
                />
                <DashboardCard
                  height={"50%"}
                  width={"100%"}
                  title={"Total Sales"}
                  titlePosition={"left"}
                  body={
                    <Table
                      fetchedData={revenueData}
                      fetchedColumns={[
                        {
                          Header: "Name",
                          accessor: "name",
                        },
                        {
                          Header: "Count",
                          accessor: "count",
                        },
                        {
                          Header: "Price",
                          accessor: "price",
                        },
                        {
                          Header: "Date",
                          accessor: "date",
                        },
                      ]}
                    />
                  }
                />
              </div>
            </div>
          }
        />
      </section>
    </div>
  );
};

export default CardsSection;
