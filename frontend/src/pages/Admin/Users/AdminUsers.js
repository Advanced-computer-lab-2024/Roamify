import React, { useState, useEffect } from "react";
import UsersTable from "./UsersTable.js";
import axios from "axios";
import { toCamelCase } from "../../../functions/toCamelCase.js";
import CommonBanner from "../../../component/Common/CommonBanner.js";
import AddUserButton from "./AddUserButton.js";
import toast, { Toaster } from "react-hot-toast";
import EmptyResponseLogo from "../../../component/EmptyResponseLogo.js"; // Assuming EmptyResponseLogo is a component
import LoadingLogo from "../../../component/LoadingLogo.js";

const AdminUsers = ({ usersName }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasNoUsers, setHasNoUsers] = useState(false);

  const fetchUsers = async () => {
    setLoading(true); // Set loading to true when starting to fetch data
    try {
      const response = await axios.get(
        `http://localhost:3000/api/admin/get-users/${toCamelCase(
          usersName
        ).slice(0, -1)}`,
        { withCredentials: true }
      );
      const fetchedUsers = response.data.users;
      setUsers(fetchedUsers);
      setHasNoUsers(fetchedUsers.length === 0); // Check if there are no users
    } catch (error) {
      console.error("Error fetching users:", error);
      setHasNoUsers(true);
      toast.error("An error occurred while fetching users.");
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [usersName]); // Fetch users initially and when usersName changes

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
            <AddUserButton
              userType={"Tourism Governor"}
              fetchUsers={fetchUsers}
            />
          </div>
        )}
      </div>

      {/* Conditional Loading and Users Display */}
      <div style={{ marginTop: "10px", padding: "0px 4vw" }}>
        {loading ? (
          <p style={{ fontSize: "18px", color: "var(--text-color)" }}>
            <LoadingLogo isVisible={true} />
          </p> // Show loading text or spinner
        ) : hasNoUsers ? (
          <EmptyResponseLogo
            isVisible={true}
            size="400px"
            text={`No ${usersName} Found`}
          />
        ) : (
          <UsersTable users={users} fetchPendingUsers={fetchUsers} />
        )}
      </div>

      {/* Optional: Add global placeholder styling */}
      <style>
        {`
          input::placeholder {
            color: var(--dashboard-title-color); /* You can replace this with any color you prefer */
          }
        `}
      </style>

      {/* Toast notifications */}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default AdminUsers;
