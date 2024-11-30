import React from "react";
import { useTable, useSortBy } from "react-table";

const Table = ({ fetchedData, fetchedColumns }) => {
  const data = React.useMemo(() => fetchedData, [fetchedData]);
  const columns = React.useMemo(() => fetchedColumns, [fetchedColumns]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      { columns, data },
      useSortBy // Hook to add sorting functionality
    );

  return (
    <div style={{ overflowX: "auto", padding: "20px" }}>
      <table
        {...getTableProps()}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "var(--secondary-color)",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              style={{
                backgroundColor: "var(--secondary-color)",
                borderBottom: "2px solid var(--background-color)",
              }}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    padding: "12px 15px",
                    fontSize: "14px",
                    fontWeight: "600",
                    textAlign: "left",
                    color: "var(--dashboard-title-color)",
                    cursor: "pointer",
                    userSelect: "none",
                    position: "relative",
                    borderBottom: "1px solid var(--background-color)",
                  }}
                >
                  {column.render("Header")}
                  <span
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "12px",
                      color: "var(--dashboard-title-color)",
                    }}
                  >
                    {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={{
                  borderBottom: "1px solid #f0f0f0",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--background-color)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "")
                }
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "12px 15px",
                      textAlign: "left",
                      color: "var(--dashboard-title-color)",
                      fontSize: "14px",
                      borderBottom: "1px solid var(--background-color)",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
