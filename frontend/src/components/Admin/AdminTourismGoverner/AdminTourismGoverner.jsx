import React, { useState, useEffect } from "react";
import UsersTable from "../UsersPage/UsersTable.jsx";
import SearchBar from "../../SearchBar.jsx";
import AddTourismGovernorButton from "./AddTourismGovernorButton.jsx";
import axios from "axios";

const AdminTourismGovernor = () => {
  const [users, setUsers] = useState([]);

  // Fetch users by role
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/get-users/tourismGovernor`
        );
        setUsers(response.data.users); // Assuming the API returns an array of users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div>
      <p>Tourism Governers</p>
      <div className="flex">
        <AddTourismGovernorButton />
      </div>
      <UsersTable users={users} />
    </div>
  );
};

export default AdminTourismGovernor;
