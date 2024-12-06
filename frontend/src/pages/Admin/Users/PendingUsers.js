import React, { useState, useEffect } from "react";
import UsersTable from "./UsersTable.js";
import axios from "axios";
import CommonBanner from "../../../component/Common/CommonBanner.js";
import toast, { Toaster } from "react-hot-toast";
import EmptyResponseLogo from "../../../component/EmptyResponseLogo.js";

const PendingUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasNoPendingUsers, setHasNoPendingUsers] = useState(false);

  const fetchPendingUsers = async () => {
    setLoading(true); // Set loading to true when starting to fetch data
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/get-pending-users",
        { withCredentials: true }
      );
      const pendingUsers = response.data.pendingUsers;
      setUsers(pendingUsers);
      setHasNoPendingUsers(pendingUsers.length === 0); // Check if no pending users
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setUsers([]); // Clear the users array if status code is 400
        setHasNoPendingUsers(true); // No pending users if there's an error
      } else {
        console.error("Error fetching pending users:", error);
        toast.error("An unexpected error occurred while fetching users.");
      }
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

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
          Pending Users
        </h1>
      </div>

      {/* Conditional Loading and Users Display */}
      <div style={{ marginTop: "10px", padding: "0px 4vw" }}>
        {loading ? (
          <p style={{ fontSize: "18px", color: "var(--text-color)" }}>
            Loading...
          </p> // Show loading indicator
        ) : hasNoPendingUsers ? (
          <EmptyResponseLogo
            isVisible={true}
            size="400px"
            text={"No Pending Users Currently.."}
          />
        ) : (
          <UsersTable
            users={users}
            isPending={true}
            fetchPendingUsers={fetchPendingUsers}
          />
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

export default PendingUsers;
