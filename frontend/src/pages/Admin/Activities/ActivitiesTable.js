import React from "react";
import ActivitiesTableRow from "./ActivitiesTableRow";

const ActivitiesTable = ({ columns, categories, type }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          minWidth: "100%",
          backgroundColor: "white",
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
              borderColor: "#d1d5db", // Tailwind gray-300
            }}
          >
            {columns.map((column, index) => (
              <th
                key={index}
                style={{
                  fontWeight: "400",
                  paddingTop: "0.75rem",
                  paddingBottom: "0.75rem",
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                  textAlign: "left",
                }}
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          style={{
            color: "#1f2937", // Tailwind gray-800
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivitiesTable;
