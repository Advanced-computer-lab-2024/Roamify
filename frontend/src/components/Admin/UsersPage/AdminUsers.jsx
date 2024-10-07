import React, { useState, useEffect } from "react";
import UsersTable from "./UsersTable";
import SearchBar from "../../SearchBar.jsx";
import axios from "axios";
import { toCamelCase } from "../../functions/functions.js";

const AdminUsers = ({ usersName }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/get-users/${toCamelCase(usersName).slice(
            0,
            -1
          )}`
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [usersName]);

  return (
    <div>
      <p>{usersName}</p>
      <UsersTable users={users} />
    </div>
  );
};

export default AdminUsers;
