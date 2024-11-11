import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GuestPlacesArea = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState("name");
  const [searchInput, setSearchInput] = useState("");
  const [searchInputTag, setSearchInputTag] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [showShareOptions, setShowShareOptions] = useState({});
  // Fetch places based on search criteria
  const fetchPlaces = async (searchParams = {}) => {
    setLoading(true);

    if (searchParams.tags && Array.isArray(searchParams.tags)) {
      searchParams.tags = searchParams.tags.join(",");
    }

    try {
      const response = await axios.get("http://localhost:3000/api/places", {
        params: searchParams,
        
      });

      if (response.data.message === "No places found matching your criteria") {
        toast.info("No data found");
        setPlaces([]);
      } else {
        setPlaces(response.data.places || []);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("No data found");
      } else {
        console.error("Error fetching places:", error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlaces();
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/historical-tag/get-all",
         
        );
        setTags(response.data.data || []);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  

  const handleTagChange = (event) => {
    const tagId = event.target.value;
    setSelectedTag(tagId);
    fetchPlaces({ tags: tagId ? [tagId] : [] });
  };
 

  return (
    <section id="top_destinations" className="section_padding">
      <ToastContainer />
      <div className="container">
        <SectionHeading heading={`${places.length} destinations found`} />

        <div className="row">
          <div className="col-lg-3">
            

            <div className="left_side_search_boxed">
              <div className="left_side_search_heading">
                <h5>Filter by Tags</h5>
              </div>
              <select
                className="form-control"
                value={selectedTag}
                onChange={handleTagChange}
                style={{ marginBottom: "10px" }}
              >
                <option value="">All Tags</option>
                {tags && tags.length > 0 ? (
                  tags.map((tag) => (
                    <option key={tag._id} value={tag._id}>
                      {tag.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No tags available</option>
                )}
              </select>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="row">
              {loading ? (
                <p>Loading...</p>
              ) : (
                places.map((data, index) => (
                  <div
                    className="col-lg-4 col-md-6 col-sm-6 col-12"
                    key={data._id || index}
                  >
                    <div
                      className="top_destinations_box img_hover"
                      style={{
                        textAlign: "center",
                        color: "purple",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "10px",
                        marginBottom: "20px",
                      }}
                    >
                      <div className="heart_destinations">
                        <i className="fas fa-heart"></i>
                      </div>
                      <Link to={`/destinations-details/${data._id}`}>
                        <img
                          src={data.pictures?.[0]?.url || "default-image.jpg"}
                          alt={data.name}
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginBottom: "10px",
                          }}
                        />
                      </Link>
                      <div className="top_destinations_box_content">
                        <h4 style={{ fontSize: "1.2em", marginBottom: "10px" }}>
                          <Link
                            to={`/place-details/${data._id}`}
                            style={{ color: "purple", textDecoration: "none" }}
                          >
                            {data.name}
                          </Link>
                        </h4>
                        <p
                          style={{
                            fontSize: "0.9em",
                            marginBottom: "10px",
                            color: "purple",
                          }}
                        >
                          {data.description}
                        </p>
                        <p
                          style={{
                            fontSize: "1em",
                            fontWeight: "bold",
                            color: "purple",
                          }}
                        >
                          Ticket Price:
                          {data.ticketPrice
                            ? ` ${data.ticketPrice.Native} (Native), ${data.ticketPrice.Foreigner} (Foreigner)`
                            : " Not available"}
                        </p>
                        
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestPlacesArea;
