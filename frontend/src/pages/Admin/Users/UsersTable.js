import React from "react";
import UsersTableRow from "./UsersTableRow";

const UsersTable = ({ users, isPending, fetchPendingUsers }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          minWidth: "100%",
          backgroundColor: "var(--secondary-color)", // Similar background as ActivitiesTable
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "0.5rem",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr
            style={{
              color: "#4b5563", // Tailwind gray-600, same color as ActivitiesTable header
              textTransform: "uppercase",
              fontSize: "0.875rem",
              lineHeight: "1.5",
              borderBottomWidth: "2px",
              borderColor: "var(--border-color)", // Use border color variable
            }}
          >
            <th
              style={{
                fontWeight: "400",
                paddingTop: "3vh",
                paddingBottom: "3vh",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                textAlign: "left",
                color: "var(--text-color)", // Use text color variable
              }}
            >
              ID
            </th>
            <th
              style={{
                fontWeight: "400",
                paddingTop: "3vh",
                paddingBottom: "3vh",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                textAlign: "left",
                color: "var(--text-color)", // Use text color variable
              }}
            >
              Name
            </th>
            <th
              style={{
                fontWeight: "400",
                paddingTop: "3vh",
                paddingBottom: "3vh",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                textAlign: "left",
                color: "var(--text-color)", // Use text color variable
              }}
            >
              Email
            </th>
            <th
              style={{
                fontWeight: "400",
                paddingTop: "3vh",
                paddingBottom: "3vh",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                textAlign: "left",
                color: "var(--text-color)", // Use text color variable
              }}
            >
              Role
            </th>
          </tr>
        </thead>
        <tbody
          style={{
            color: "var(--dashboard-title-color)", // Tailwind gray-800, use dashboard title color variable
            fontSize: "0.875rem",
            fontWeight: "300", // font-light
          }}
        >
          {users.map((user, index) => (
            <UsersTableRow
              key={index}
              id={user._id}
              name={user.username}
              email={user.email}
              status={user.status}
              isPending={isPending}
              fetchPendingUsers={fetchPendingUsers}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
