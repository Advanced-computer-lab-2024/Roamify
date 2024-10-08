import React, { useState, useEffect } from "react";
import ActivitiesTable from "../AdminActivityCategories/ActivitiesTable.jsx";
import CreateActivityButton from "../AdminActivityCategories/createActivityButton.jsx";
import axios from "axios";

const AdminPreferenceTags = () => {
  const [tags, setTags] = useState([]);

  // Fetch users by role
  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/get-all-preference-tags`)
      .then((result) => {
        setTags(result.data.tags);
      })
      .catch((error) => console.error(error)),
      [];
  });
  return (
    <div>
      <div className="flex items-center justify-center">
        <p>Preference Tags</p>
        <CreateActivityButton type={"preference-tags"} />
      </div>

      <ActivitiesTable
        columns={[{ name: "id" }, { name: "name" }, { name: "description" }]}
        categories={tags}
        type={"preference-tags"}
      />
    </div>
  );
};

export default AdminPreferenceTags;
