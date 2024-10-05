import React from "react";
import ActivitiesTableRow from "./ActivitiesTableRow.jsx";

const ActivitiesTable = ({ activities }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="text-gray-600 uppercase text-sm leading-normal border-b-2 border-gray-300">
            <th className="font-normal py-3 px-6 text-left">ID</th>
            <th className="font-normal py-3 px-6 text-left">Name</th>
            <th className="font-normal py-3 px-6 text-left">Category</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm font-light">
          {activities.map((activity, index) => (
            <ActivitiesTableRow
              key={index}
              id={activity.id}
              name={activity.name}
              email={activity.category}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivitiesTable;
