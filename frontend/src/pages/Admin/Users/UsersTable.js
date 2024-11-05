import React from "react";
import UsersTableRow from "./UsersTableRow";

const UsersTable = ({ users }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          minWidth: "100%",
          backgroundColor: "white",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr
            style={{
              color: "#4A5568",
              textTransform: "uppercase",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              borderBottom: "2px solid #D2D6DC",
            }}
          >
            <th
              style={{
                fontWeight: "normal",
                padding: "12px 24px",
                textAlign: "left",
              }}
            >
              ID
            </th>
            <th
              style={{
                fontWeight: "normal",
                padding: "12px 24px",
                textAlign: "left",
              }}
            >
              Name
            </th>
            <th
              style={{
                fontWeight: "normal",
                padding: "12px 24px",
                textAlign: "left",
              }}
            >
              Email
            </th>
            <th
              style={{
                fontWeight: "normal",
                padding: "12px 24px",
                textAlign: "left",
              }}
            >
              Role
            </th>
          </tr>
        </thead>
        <tbody
          style={{
            color: "#2D3748",
            fontSize: "0.875rem",
            fontWeight: "300",
          }}
        >
          {users.map((user, index) => (
            <UsersTableRow
              key={index}
              id={user._id}
              name={user.username}
              email={user.email}
              status={user.status}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
