import React from "react";
import UsersTable from "./ActivitiesTable.jsx";
import SearchBar from "../../SearchBar.jsx";
import ActivitiesTable from "./ActivitiesTable.jsx";
import DeleteCategoryButton from "./DeleteCategoryButton.jsx";

const AdminActivities = () => {
  return (
    <div>
      <p>Food</p>
      <div className="flex">
        <SearchBar />
        <DeleteCategoryButton categoryName={""} />
      </div>

      <ActivitiesTable
        activities={[
          {
            id: "1",
            name: "Activity 1",
            category: "food",
          },
          {
            id: "2",
            name: "Activity 2",
            category: "concert",
          },
          {
            id: "3",
            name: "Activity 3",
            category: "party",
          },
        ]}
      />
    </div>
  );
};

export default AdminActivities;
