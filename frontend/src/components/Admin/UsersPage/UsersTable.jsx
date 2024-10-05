import React from "react";
import UsersTableRow from "./UsersTableRow.jsx";

const UsersTable = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="text-gray-600 uppercase text-sm leading-normal border-b-2 border-gray-300">
            <th className="font-normal py-3 px-6 text-left">ID</th>
            <th className="font-normal py-3 px-6 text-left">Name</th>
            <th className="font-normal py-3 px-6 text-left">Email</th>
            <th className="font-normal py-3 px-6 text-left">Role</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm font-light">
          {users.map((user, index) => (
            <UsersTableRow
              key={index}
              id={user.id}
              name={user.name}
              email={user.email}
              role={user.role}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
