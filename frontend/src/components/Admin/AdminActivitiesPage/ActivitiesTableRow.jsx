import React from "react";
import DeleteIcon from "../../Icons/DeleteIcon";

const ActivitiesTableRow = ({ id, name, category }) => {
  return (
    <tr className="hover:bg-gray-50 transition duration-200 ease-in-out border-b border-gray-200">
      <td className="py-4 px-6 ">{id}</td>
      <td className="py-4 px-6">{name}</td>
      <td className="py-4 px-6">{category}</td>
    </tr>
  );
};

export default ActivitiesTableRow;
