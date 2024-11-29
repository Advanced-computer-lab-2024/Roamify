import React from "react";

const DashboardSidebar = () => {
  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "var(--secondary-color)",
        padding: "20px",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <img src="logo.png" alt="logo" />
      </div>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "15px 0" }}>
            <a
              href="#"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Dashboard
            </a>
          </li>
          <li style={{ margin: "15px 0" }}>
            <a
              href="#"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Analytics
            </a>
          </li>
          <li style={{ margin: "15px 0" }}>
            <a
              href="#"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Settings
            </a>
          </li>
          <li style={{ margin: "15px 0" }}>
            <a
              href="#"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Notifications
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
