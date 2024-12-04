import React from "react";
import DeleteButton from "../Activities/DeleteButton";
import RejectButton from "./RejectButton";
import AcceptButton from "./AcceptButton";
import ViewDocumentsButton from "./ViewDocumentsButton";
import axios from "axios";
import toast from "react-hot-toast";

const UsersTableRow = ({
  id,
  name,
  email,
  status,
  isPending,
  fetchPendingUsers,
}) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/admin/delete-account/${id}`,
        { withCredentials: true }
      );

      toast.success(response.data.message);
      fetchPendingUsers();
    } catch (error) {
      console.error("Error deleting user:", error.toString());
      toast.error(error.data.message);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/admin/accept-reject-user",
        { userIdString: id, approved: "accept" },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      fetchPendingUsers();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/admin/accept-reject-user",
        { userIdString: id, approved: "reject" },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      fetchPendingUsers();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <tr
      style={{
        transition: "background-color 0.2s ease-in-out",
        borderBottom: "2px solid var(--border-color)", // Tailwind gray-200
        borderBottomWidth: "1px",
        borderColor: "var(--border-color)", // Use border color variable
      }}
      onMouseEnter={
        (e) =>
          (e.currentTarget.style.backgroundColor = "var(--background-color)") // Hover effect
      }
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
        {id}
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
        {email}
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
        {status}
      </td>
      <td
        style={{
          padding: "20px 1vw",
          textAlign: "center", // Center buttons
          display: "flex",
          justifyContent: "center",
        }}
      >
        {!isPending && <DeleteButton handleDelete={handleDelete} />}
        {isPending && (
          <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
            <ViewDocumentsButton userId={id} />
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <AcceptButton onAccept={handleAccept} />
              <RejectButton onReject={handleReject} />
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default UsersTableRow;
