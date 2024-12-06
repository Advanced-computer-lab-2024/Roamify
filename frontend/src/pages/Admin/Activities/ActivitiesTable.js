import React from "react";
import ActivitiesTableRow from "./ActivitiesTableRow";

const ActivitiesTable = ({ columns, categories, type, reFetch }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          minWidth: "100%",
          backgroundColor: "var(--secondary-color)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "0.5rem",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr
            style={{
              color: "#4b5563", // Tailwind gray-600
              textTransform: "uppercase",
              fontSize: "0.875rem",
              lineHeight: "1.5",
              borderBottomWidth: "2px",
              borderColor: "var(--border-color)",
            }}
          >
            {columns.map((column, index) => (
              <th
                key={index}
                style={{
                  fontWeight: "400",
                  paddingTop: "3vh",
                  paddingBottom: "3vh",
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                  textAlign: "left",
                  color: "var(--text-color)",
                }}
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          style={{
            color: "var(--dashboard-title-color)", // Tailwind gray-800
            fontSize: "0.875rem",
            fontWeight: "300", // font-light
          }}
        >
          {categories.map((category, index) => (
            <ActivitiesTableRow
              key={index}
              id={category._id}
              name={category.name}
              description={category.description}
              type={type}
              reFetch={reFetch}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivitiesTable;
