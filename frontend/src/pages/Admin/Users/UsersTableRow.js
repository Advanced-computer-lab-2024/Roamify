// UsersTableRow.js
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
      console.log("User deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting user:", error.toString());
    }
  };

  const handleAccept = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/admin/accept-reject-user",
        { userIdString: id, approved: "accept" },
        { withCredentials: true }
      );
      toast.success(response.data);
      console.log(response.data);
      fetchPendingUsers();
    } catch (error) {
      toast.error(error.data);
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/admin/accept-reject-user",
        { userIdString: id, approved: "reject" },
        { withCredentials: true }
      );
      toast.success(response.data);
      console.log(response.data);
      fetchPendingUsers();
    } catch (error) {
      toast.error(error.data);
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
        {!isPending && <DeleteButton handleDelete={handleDelete} />}
        {isPending && (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <ViewDocumentsButton userId={id} />
            <AcceptButton onAccept={handleAccept} />
            <RejectButton onReject={handleReject} />
          </div>
        )}
      </td>
    </tr>
  );
};

export default UsersTableRow;
