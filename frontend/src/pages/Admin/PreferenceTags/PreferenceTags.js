import React, { useState, useEffect } from "react";
import ActivitiesTable from "../Activities/ActivitiesTable.js";
import CommonBanner from "../../../component/Common/CommonBanner.js";
import axios from "axios";
import CreateTagButton from "../Activities/CreateTagButton.js";

const PreferenceTags = () => {
  const [preferenceTags, setPreferenceTags] = useState([]);

  // Fetch users by role
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/preference-tag/get-all`, {
        withCredentials: true,
      })
      .then((result) => {
        setPreferenceTags(result.data.tags);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      <CommonBanner heading="Prefernce Tags" pagination="Tags" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <CreateActivityButton type={"category"} /> */}
      </div>
      <CreateTagButton type={"preference-tag"} />
      <ActivitiesTable
        columns={[{ name: "name" }, { name: "description" }]}
        categories={preferenceTags}
        type={"preference-tag"}
      />
    </div>
  );
};

export default PreferenceTags;
