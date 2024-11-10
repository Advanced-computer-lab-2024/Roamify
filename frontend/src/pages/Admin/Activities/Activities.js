import React, { useState, useEffect } from "react";
import ActivitiesTable from "./ActivitiesTable.js";
import CommonBanner from "../../../component/Common/CommonBanner.js";
import axios from "axios";
import CreateTagButton from "./CreateTagButton.js";

const Activities = () => {
  const [categories, setCategories] = useState([]);

  // Fetch users by role
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/category/get-all`, {
        withCredentials: true,
      })
      .then((result) => {
        setCategories(result.data.categories);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      <CommonBanner heading="Activity Categories" pagination="Categories" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <CreateActivityButton type={"category"} /> */}
      </div>
      <CreateTagButton type={"category"} />
      <ActivitiesTable
        columns={[{ name: "name" }, { name: "description" }]}
        categories={categories}
        type={"category"}
      />
    </div>
  );
};

export default Activities;
