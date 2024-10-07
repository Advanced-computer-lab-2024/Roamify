import React from "react";
import ActivitiesTableRow from "./ActivitiesTableRow.jsx";

const ActivitiesTable = ({ columns, categories, type }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="text-gray-600 uppercase text-sm leading-normal border-b-2 border-gray-300">
            {columns.map((column, index) => (
              <th key={index} className="font-normal py-3 px-6 text-left">
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm font-light">
          {categories.map((category, index) => (
            <ActivitiesTableRow
              key={index}
              id={category._id}
              name={category.name}
              description={category.description}
              type={type}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivitiesTable;
