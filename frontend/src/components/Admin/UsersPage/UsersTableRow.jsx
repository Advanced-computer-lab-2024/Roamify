import React from "react";
import DeleteIcon from "../../Icons/DeleteIcon";

const UsersTableRow = ({ id, name, email, role }) => {
  return (
    <tr className="hover:bg-gray-50 transition duration-200 ease-in-out border-b border-gray-200">
      <td className="py-4 px-6 ">{id}</td>
      <td className="py-4 px-6">{name}</td>
      <td className="py-4 px-6">{email}</td>
      <td className="py-4 px-6">{role}</td>
      <td className="py-4 px-6">
        <button className=" rounded-full  w-fit p-2 relative hover:scale-110">
          <DeleteIcon />
        </button>
      </td>
    </tr>
  );
};

export default UsersTableRow;
