import React, { useEffect, useState } from "react";
import axios from "axios";
import SectionHeading from "../../../../component/Common/SectionHeading";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingLogo from "../../../../component/LoadingLogo";
import { Share } from "@mui/icons-material";
import ShareModal from "../TouristItinerarySearch/ShareModal";
import EmptyResponseLogo from "../../../../component/EmptyResponseLogo";

const TouristPlacesArea = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState("name");
  const [searchInput, setSearchInput] = useState("");
  const [searchInputTag, setSearchInputTag] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [showShareOptions, setShowShareOptions] = useState({});
  const [error, setError] = useState("");

  const fetchPlaces = async (searchParams = {}) => {
    setLoading(true);

    if (searchParams.tags && Array.isArray(searchParams.tags)) {
      searchParams.tags = searchParams.tags.join(",");
    }

    try {
      const response = await axios.get("http://localhost:3000/api/places", {
        params: searchParams,
        withCredentials: true,
      });

      console.log("API Response:", response.data); // Added for debugging

      if (response.data.message === "No places found matching your criteria") {
        setPlaces([]); // Set places to empty array
      } else {
        setPlaces(response.data.places || []); // Populate places with data from API
      }
    } catch (error) {
      setError(error.response.data.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlaces();

    const fetchTags = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/historical-tag/get-all",
          { withCredentials: true }
        );
        console.log("Tags Response:", response.data); // Added for debugging
        setTags(response.data.data || []);
      } catch (error) {
        console.error(
          "Error fetching tags:",
          error.response || error.message || error
        );
      }
    };
    fetchTags();
  }, []);

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setSearchInput("");
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchInputTagChange = (event) => {
    setSearchInputTag(event.target.value);
  };

  const handleSearchClick = async () => {
    const searchParams = {};

    if (searchType === "name" && searchInput) {
      searchParams.name = searchInput;
    } else if (searchType === "tag" && searchInputTag) {
      const matchingTag = tags.find(
        (tag) => tag.name.toLowerCase() === searchInputTag.toLowerCase()
      );

      if (matchingTag) {
        searchParams.tags = [matchingTag._id];
      } else {
        // Clear previous results if no matching tag is found
        setPlaces([]);
        toast.info("Tag not found");
        return;
      }
    }

    fetchPlaces(searchParams);
  };

  const handleTagChange = (event) => {
    const tagId = event.target.value;
    setSelectedTag(tagId);

    // Fetch places with the selected tag
    fetchPlaces({ tags: tagId || undefined });
  };

  const handleShareToggle = (placesId) => {
    setShowShareOptions((prevState) => ({
      ...prevState,
      [placesId]: !prevState[placesId],
    }));
  };

  const handleCopyLink = (placesId) => {
    const activityUrl = `${window.location.origin}/place-details/${placesId}`;
    navigator.clipboard
      .writeText(activityUrl)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleEmailShare = (place) => {
    const subject = `Check out this activity: ${place.name}`;
    const body = `I thought you'd be interested in this activity: ${place.name}\n\nLocation: ${place.location.name}\n\nPrice: ${place.price} EGP\n\nCheck it out: ${window.location.origin}/place-details/${place._id}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
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
                <h5>Search by</h5>
              </div>
              <div className="name_search_form" style={{ display: "block" }}>
                <select
                  className="form-control"
                  value={searchType}
                  onChange={handleSearchTypeChange}
                  style={{ marginBottom: "10px" }}
                >
                  <option value="name">Name</option>
                  <option value="tag">Tag</option>
                </select>
                <input
                  className="form-control"
                  type="text"
                  placeholder={`Search by ${searchType}...`}
                  value={searchType === "tag" ? searchInputTag : searchInput}
                  onChange={
                    searchType === "tag"
                      ? handleSearchInputTagChange
                      : handleSearchInputChange
                  }
                  style={{ marginBottom: "10px" }}
                />
                <button
                  onClick={handleSearchClick}
                  className="btn btn_theme btn_sm"
                >
                  Apply
                </button>
              </div>
            </div>

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
                <LoadingLogo isVisible={true} size="100px" />
              ) : error ? (
                <EmptyResponseLogo isVisible={true} text={error} size="200px" />
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
                        height: "40vh",
                        marginBottom: "20px",
                      }}
                    >
                      <Link to={`/destinations-details/${data._id}`}>
                        <img
                          src={data.pictures?.[0]?.url || "default-image.jpg"}
                          alt={data.name}
                          style={{
                            objectFit: "cover",
                            borderRadius: "8px",
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
                        <button
                          className="btn btn_theme btn_sm"
                          onClick={() => handleShareToggle(data._id)}
                          style={{
                            position: "absolute",
                            top: "-60px",
                            right: "5px",
                          }}
                        >
                          <Share style={{ marginRight: "8px" }} />
                          Share
                        </button>
                        {showShareOptions[data._id] && (
                          <ShareModal
                            handleCopy={() => handleCopyLink(data._id)}
                            handleShareEmail={() => handleEmailShare(data)}
                            isOpen={true}
                            onClose={() => handleShareToggle(data._id)}
                          />
                        )}
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

export default TouristPlacesArea;
