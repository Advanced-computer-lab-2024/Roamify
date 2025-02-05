// PendingUsers.js
import React, { useState, useEffect } from "react";
import UsersTable from "./UsersTable.js";
import axios from "axios";
import CommonBanner from "../../../component/Common/CommonBanner.js";
import toast, { Toaster } from "react-hot-toast";

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
    <div>
      <p>Pending Users</p>
      {loading ? (
        <p>Loading...</p> // Show loading indicator
      ) : hasNoPendingUsers ? (
        <p>No pending users available.</p> // Show message if no pending users
      ) : (
        <UsersTable
          users={users}
          isPending={true}
          fetchPendingUsers={fetchPendingUsers}
        />
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default PendingUsers;
