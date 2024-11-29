import React from "react";
import { Canvas, useLoader } from "@react-three/fiber"; // Correct useLoader import
import { OrbitControls } from "@react-three/drei"; // OrbitControls from drei
import * as THREE from "three";

const Earth = () => {
  // Load the Earth texture
  const earthTexture = useLoader(THREE.TextureLoader, "/2k_earth_daymap.jpg");

  return (
    <mesh>
      {/* Create a sphere geometry */}
      <sphereGeometry args={[2, 64, 64]} />
      {/* Apply the Earth texture */}
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
};

const EarthCanvas = () => (
  <div style={{ height: "100vh", backgroundColor: "#fff" }}>
    <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
      <ambientLight intensity={3} />
      <directionalLight position={[10, 10, 10]} />
      {/* Render the Earth sphere */}
      <Earth />
      {/* Enable orbit controls */}
      <OrbitControls enableZoom={true} />
    </Canvas>
  </div>
);

export default EarthCanvas;
