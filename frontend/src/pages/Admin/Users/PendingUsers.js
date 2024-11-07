import React, { useState, useEffect } from "react";
import UsersTable from "./UsersTable.js";
import axios from "axios";
import CommonBanner from "../../../component/Common/CommonBanner.js";
import AddUserButton from "./AddUserButton.js";

const PendingUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/get-pending-users",
          { withCredentials: true }
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching pending users:", error);
      }
    };

    fetchPendingUsers();
  }, []);

  return (
    <div>
      <CommonBanner heading="Pending Users" pagination="Pending Users" />
      <p>Pending Users</p>
      <div className="flex">
        <AddUserButton />
      </div>
      <UsersTable users={users} isPending={true} />
    </div>
  );
};

export default PendingUsers;
