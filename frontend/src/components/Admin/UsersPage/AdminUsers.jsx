import React from "react";
import UsersTable from "./UsersTable";
import SearchBar from "../../SearchBar.jsx";

const AdminUsers = ({ usersName }) => {
  return (
    <div>
      <p>{usersName}</p>
      <SearchBar />
      <UsersTable
        users={[
          {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            role: "Admin",
          },
          {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            role: "Tourist",
          },
          {
            id: "3",
            name: "Mark Brown",
            email: "mark@example.com",
            role: "Seller",
          },
        ]}
      />
    </div>
  );
};

export default AdminUsers;
