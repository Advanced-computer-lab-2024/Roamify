import React, { useState, useEffect } from "react";
import UsersTable from "./ActivitiesTable.jsx";
import SearchBar from "../../SearchBar.jsx";
import ActivitiesTable from "./ActivitiesTable.jsx";
import DeleteCategoryButton from "./DeleteCategoryButton.jsx";
import CreateActivityButton from "./createActivityButton.jsx";
import axios from "axios";

const AdminActivities = () => {
  const [categories, setCategories] = useState([]);

  // Fetch users by role
  useEffect(() => {
    axios
      .get(`http://localhost:3000/category/get-categories`)
      .then((result) => {
        setCategories(result.data.categories);
      })
      .catch((error) => console.error(error)),
      [];
  });
  return (
    <div>
      <div className="flex items-center justify-center">
        <p>Activity Categories</p>
        <CreateActivityButton type={"category"} />
      </div>

      <ActivitiesTable
        columns={[{ name: "id" }, { name: "name" }, { name: "description" }]}
        categories={categories}
        type={"category"}
      />
    </div>
  );
};

export default AdminActivities;
