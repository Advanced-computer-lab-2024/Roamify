import React from "react";
import DeleteButton from "../Activities/DeleteButton";
import AcceptButton from "../Activities/AcceptButton"; // Placeholder for the AcceptButton component
import RejectButton from "../Activities/RejectButton"; // Placeholder for the RejectButton component
import axios from "axios";

const UsersTableRow = ({ id, name, email, status, isPending }) => {
  const handleDelete = async () => {
    try {
      // Make a DELETE request to the backend API
      const response = await axios.delete(
        `http://localhost:3000/api/admin/delete-account/${id}`,
        { withCredentials: true }
      );
      console.log("User deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting user:", error.toString());
    }
  };

  return (
    <tr
      style={{
        transition: "background-color 0.2s ease-in-out",
        borderBottom: "1px solid #E5E7EB",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      <td style={{ padding: "16px 24px" }}>{id}</td>
      <td style={{ padding: "16px 24px" }}>{name}</td>
      <td style={{ padding: "16px 24px" }}>{email}</td>
      <td style={{ padding: "16px 24px" }}>{status}</td>
      <td style={{ padding: "16px 24px", display: "flex", gap: "10px" }}>
        <DeleteButton handleDelete={handleDelete} />
        {isPending && (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <AcceptButton id={id} />
            <RejectButton id={id} />
          </div>
        )}
      </td>
    </tr>
  );
};

export default UsersTableRow;
