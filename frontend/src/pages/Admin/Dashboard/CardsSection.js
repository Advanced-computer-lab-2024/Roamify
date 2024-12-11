import React, { useState, useEffect } from "react";
import StatsCard from "./StatsCard";
import LineChart from "./LineChart";
import DashboardCard from "./DashboardCard";

const CardsSection = ({ date }) => {
  const [totalTourists, setTotalTourists] = useState(0);
  const [totalData, setTotalData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially

  useEffect(() => {
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
        setTotalRevenue(revenueResponse?.data?.totalRevenue);
        setRevenueData(formattedRevenueData);
      } catch (err) {
        console.error("Error fetching revenue data", err);
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
        setTotalTourists(touristsResponse?.data?.totalTourists);
      } catch (err) {
        setTotalTourists(0);
        console.error("Error fetching tourists data", err);
      }
    };

    // Set loading to true before starting API requests
    setLoading(true);
    const fetchData = async () => {
      // Wait for both API calls to finish before setting loading to false
      await Promise.all([fetchRevenueData(), fetchTouristsData()]);
      setLoading(false); // Now set loading to false after the data has been fetched
    };

    fetchData();
  }, [date]);
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
