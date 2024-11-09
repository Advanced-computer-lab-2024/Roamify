// UsersTableRow.js
import React from "react";
import DeleteButton from "../Activities/DeleteButton";
import RejectButton from "./RejectButton";
import AcceptButton from "./AcceptButton";
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
      console.log("User deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting user:", error.toString());
    }
  };

  const handleAccept = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/admin/accept-reject-user",
        { userIdString: id, approve: "accept" },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      console.log(response.data);
      fetchPendingUsers();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/admin/accept-reject-user",
        { userIdString: id, approve: "reject" },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      console.log(response.data);
      fetchPendingUsers();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  const handleViewDocuments = () => {
    console.log("Viewing documents for user:", id);
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
        {!isPending && <DeleteButton handleDelete={handleDelete} />}
        {isPending && (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              onClick={handleViewDocuments}
              style={{
                padding: "8px 12px",
                backgroundColor: "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#5a6268")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#6c757d")
              }
            >
              View Documents
            </button>
            <AcceptButton onAccept={handleAccept} />
            <RejectButton onReject={handleReject} />
          </div>
        )}
      </td>
    </tr>
  );
};

export default UsersTableRow;
