import React from "react";
import DeleteIcon from "../../Icons/DeleteIcon";
import DeleteCategoryButton from "./DeleteCategoryButton";
import EditCategoryButton from "./EditCategoryButton";

const ActivitiesTableRow = ({ id, name, description, type }) => {
  return (
    <tr className="hover:bg-gray-50 transition duration-200 ease-in-out border-b border-gray-200">
      <td className="py-4 px-6 ">{id}</td>
      <td className="py-4 px-6">{name}</td>
      <td className="py-4 px-6">{description}</td>
      <td>
        <EditCategoryButton
          type={type}
          categoryId={id}
          name={name}
          description={description}
        />
      </td>
      <td>
        <DeleteCategoryButton categoryId={id} type={type} />
      </td>
    </tr>
  );
};

export default ActivitiesTableRow;
