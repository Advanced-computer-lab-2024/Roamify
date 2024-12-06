import React from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import axios from "axios";
// import EditCategoryButton from "./EditCategoryButton";

const ActivitiesTableRow = ({ id, name, description, type, reFetch }) => {
  const handleDelete = async () => {
    try {
      // Make a DELETE request to the backend API
      const response = await axios.delete(
        `http://localhost:3000/api/admin/delete-${type}/${id}`,
        {
          withCredentials: true,
        }
      );

      reFetch();
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
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--background-color)")
      } // Hover effect: Tailwind gray-50
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
          padding: "10px 2vw",
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
          padding: "10px 2vw",
        }}
      >
        {description}
      </td>
      <td
        style={{
          padding: "15px 0px",
          textAlign: "end",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <EditButton
          type={type}
          itemId={id}
          name={name}
          description={description}
          reFetch={reFetch}
        />
      </td>
      <td style={{ padding: "15px 0px", textAlign: "center" }}>
        <DeleteButton handleDelete={handleDelete} />
      </td>
    </tr>
  );
};

export default ActivitiesTableRow;
