import React from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import axios from "axios";
// import EditCategoryButton from "./EditCategoryButton";

const ActivitiesTableRow = ({ id, name, description, type }) => {
  const handleDelete = async () => {
    try {
      // Make a DELETE request to the backend API
      const response = await axios.delete(
        `http://localhost:3000/api/admin/delete-${type}/${id}`,
        {
          withCredentials: true,
        }
      );

      console.log("Category deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting category:", error.toString());
    }
  };
  return (
    <tr
      style={{
        transition: "background-color 0.2s ease-in-out",
        borderBottom: "2px solid var(--border-color)", // Tailwind gray-200
        borderBottomWidth: "1px",
        borderColor: "var(--border-color)",
        padding: "20px 10px",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")} // Hover effect: Tailwind gray-50
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      <td
        style={{
          paddingTop: "1rem",
          paddingBottom: "1rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        {name}
      </td>
      <td
        style={{
          paddingTop: "1rem",
          paddingBottom: "1rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        {description}
      </td>
      <td>
        <EditButton
          type={type}
          itemId={id}
          name={name}
          description={description}
        />
      </td>
      <td>
        <DeleteButton handleDelete={handleDelete} />
      </td>
    </tr>
  );
};

export default ActivitiesTableRow;
