import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Globe component
const Globe = () => {
  const texture = new THREE.TextureLoader().load("/8k_earth_daymap.jpg");

  return (
    <mesh>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const MemoizedCanvas = React.memo(() => (
  <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
    <ambientLight intensity={3} />
    <directionalLight position={[5, 5, 5]} />
    <Globe />
    <OrbitControls
      enableZoom={false}
      mouseButtons={{
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: null,
      }}
    />
  </Canvas>
));

const HomeBanner = () => {
  const handleContextMenu = (event) => {
    event.preventDefault(); // Disable right-click actions
  };

  return (
    <section
      id="home_one_banner"
      style={{
        position: "relative",
        height: "100vh",
        backgroundColor: "var(--background-color)",
        backgroundImage: "url('/8k_stars_milky_way.jpg')",
      }}
    >
      <div
        style={{ position: "absolute", inset: "10vh 0 0 0", cursor: "pointer" }}
        // onContextMenu={handleContextMenu} // Disable right-click menu
      >
        <MemoizedCanvas />
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div
              className="banner_one_text"
              style={{ position: "relative", zIndex: 10, backgroundImage: "" }}
            >
              <h1
                style={{
                  userSelect: "none", // Disable text selection
                  WebkitUserSelect: "none", // For Safari
                  MozUserSelect: "none", // For Firefox
                  msUserSelect: "none", // For older Microsoft browsers
                  cursor: "default", // Optional: Add a default cursor for better UX
                }}
              >
                Roam the world with us
              </h1>
              <h3
                style={{
                  userSelect: "none", // Disable text selection
                  WebkitUserSelect: "none", // For Safari
                  MozUserSelect: "none", // For Firefox
                  msUserSelect: "none", // For older Microsoft browsers
                  cursor: "default", // Optional: Add a default cursor for better UX
                }}
              >
                Find awesome flights, hotel, tour, car and packages
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomeBannerMemoized = React.memo(HomeBanner);

export default HomeBannerMemoized;
