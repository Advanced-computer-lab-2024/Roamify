import React from "react";

const SkeletonLoader = () => {
  const skeletonCards = new Array(5).fill(null); // Creates an array with 5 empty elements

  return (
    <section
      id="explore_area"
      style={{
        paddingBottom: "80px",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="skeleton-card"
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "var(--secondary-color)",
              position: "relative",
              overflow: "hidden", // To hide the animated gradient outside the card's boundary
            }}
          >
            {/* Left Side */}
            <div
              className="skeleton-left"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="skeleton-flight-location"
                style={{
                  width: "100%",
                  height: "30px",
                  backgroundColor: "var(--background-color)",
                  borderRadius: "4px",
                  marginBottom: "10px",
                  animation: "loading-shimmer 1.5s infinite",
                }}
              ></div>
              <div
                className="skeleton-flight-location"
                style={{
                  width: "100%",
                  height: "30px",
                  backgroundColor: "var(--background-color)",
                  borderRadius: "4px",
                  marginBottom: "10px",
                  animation: "loading-shimmer 1.5s infinite",
                }}
              ></div>
            </div>

            {/* Middle Section */}
            <div
              className="skeleton-middle"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="skeleton-text"
                style={{
                  width: "100%",
                  height: "20px",
                  backgroundColor: "var(--background-color)",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  animation: "loading-shimmer 1.5s infinite",
                }}
              ></div>
              <div
                className="skeleton-text"
                style={{
                  width: "100%",
                  height: "20px",
                  backgroundColor: "var(--background-color)",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  animation: "loading-shimmer 1.5s infinite",
                }}
              ></div>
            </div>

            {/* Right Section */}
            <div
              className="skeleton-right"
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <div
                className="skeleton-price"
                style={{
                  width: "80px",
                  height: "25px",
                  backgroundColor: "var(--background-color)",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  animation: "loading-shimmer 1.5s infinite",
                }}
              ></div>
              <div
                className="skeleton-price"
                style={{
                  width: "80px",
                  height: "25px",
                  backgroundColor: "var(--background-color)",
                  marginBottom: "10px",
                  borderRadius: "4px",
                  animation: "loading-shimmer 1.5s infinite",
                }}
              ></div>
            </div>
          </div>
        ))}

        {/* Skeleton Flight List */}
        <div
          className="skeleton-flight-list"
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
          }}
        >
          <div
            className="skeleton-flight-item"
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "20px",
            }}
          >
            {/* Flight Location */}
            <div
              className="skeleton-flight-location"
              style={{
                width: "100%",
                height: "30px",
                backgroundColor: "var(--background-color)",
                borderRadius: "4px",
                marginBottom: "10px",
                animation: "loading-shimmer 1.5s infinite",
              }}
            ></div>
          </div>
        </div>

        {/* Skeleton Tags */}
        <div
          className="skeleton-tags"
          style={{
            width: "80%",
            height: "20px",
            backgroundColor: "var(--background-color)",
            marginBottom: "10px",
            borderRadius: "4px",
            animation: "loading-shimmer 1.5s infinite",
          }}
        ></div>

        <div
          className="skeleton-tags-list"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="skeleton-tags"
            style={{
              width: "80%",
              height: "20px",
              backgroundColor: "var(--background-color)",
              marginBottom: "10px",
              borderRadius: "4px",
              animation: "loading-shimmer 1.5s infinite",
            }}
          ></div>
          <div
            className="skeleton-tags"
            style={{
              width: "80%",
              height: "20px",
              backgroundColor: "var(--background-color)",
              marginBottom: "10px",
              borderRadius: "4px",
              animation: "loading-shimmer 1.5s infinite",
            }}
          ></div>
        </div>
      </div>

      {/* Shimmer Effect Style */}
      <style>
        {`
          @keyframes loading-shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }

          .skeleton-card, .skeleton-flight-location, .skeleton-text, .skeleton-price, .skeleton-tags {
            background: linear-gradient(90deg, var(--shimmer-start-color) 25%, var(--shimmer-middle-color) 50%, var(--shimmer-end-color) 75%);
            background-size: 200% 100%;
            animation: loading-shimmer 1.5s infinite;
          }
        `}
      </style>
    </section>
  );
};

export default SkeletonLoader;
