import React from "react";
import UsersTable from "../UsersPage/UsersTable.jsx";
import SearchBar from "../../SearchBar.jsx";
import AddTourismGovernorButton from "./AddTourismGovernorButton.jsx";

const AdminTourismGovernor = () => {
  return (
    <div>
      <p>Tourism Governers</p>
      <div className="flex">
        <SearchBar />
        <AddTourismGovernorButton />
      </div>
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

export default AdminTourismGovernor;
