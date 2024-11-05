import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  return (
    <div className="profile" style={{ height: "60vh", color: "red" }}>
      hello
    </div>
  );
};

export default Profile;
