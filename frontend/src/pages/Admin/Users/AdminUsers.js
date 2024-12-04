import React, { useState, useEffect } from "react";
import UsersTable from "./UsersTable.js";
import axios from "axios";
import { toCamelCase } from "../../../functions/toCamelCase.js";
import CommonBanner from "../../../component/Common/CommonBanner.js";
import AddUserButton from "./AddUserButton.js";

const AdminUsers = ({ usersName }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/admin/get-users/${toCamelCase(
          usersName
        ).slice(0, -1)}`,
        { withCredentials: true }
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [usersName]); // Fetch users initially

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "0px",
          padding: "0px 4vw",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "var(--text-color)",
          }}
        >
          {usersName}
        </h1>

        {/* Add User Button */}
        {usersName === "Tourism Governors" && (
          <div style={{ display: "flex" }}>
            <AddUserButton userType={"Tourism Governor"} />
          </div>
        )}
      </div>

      {/* Users Table */}
      <div style={{ marginTop: "10px", padding: "0px 4vw" }}>
        <UsersTable users={users} fetchPendingUsers={fetchUsers} />
      </div>

      {/* Optional: Add global placeholder styling */}
      <style>
        {`
          input::placeholder {
            color: var(--dashboard-title-color); /* You can replace this with any color you prefer */
          }
        `}
      </style>
    </div>
  );
};

export default AdminUsers;
