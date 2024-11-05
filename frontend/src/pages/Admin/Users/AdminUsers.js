import React, { useState, useEffect } from "react";
import UsersTable from "./UsersTable.js";
import axios from "axios";
import { toCamelCase } from "../../../functions/toCamelCase.js";
import CommonBanner from "../../../component/Common/CommonBanner.js";
import AddUserButton from "./AddUserButton.js";

const AdminUsers = ({ usersName }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
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

    fetchUsers();
  }, []);

  return (
    <div>
      <CommonBanner heading="Users " pagination={usersName} />
      <p>{usersName}</p>
      {usersName === "Tourism Governors" && (
        <div className="flex">
          <AddUserButton />
        </div>
      )}
      <UsersTable users={users} />
    </div>
  );
};

export default AdminUsers;
