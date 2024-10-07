// src/components/GoogleMap.js

import React, { useEffect, useRef } from 'react';

const GoogleMap = ({ location, setLocation }) => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: -34.397, lng: 150.644 }, // Default center
            zoom: 8,
        });

        const marker = new window.google.maps.Marker({
            position: { lat: -34.397, lng: 150.644 }, // Default marker position
            map: map,
            title: "Drag me!",
            draggable: true,
        });
        markerRef.current = marker;

        // Update location when marker is dragged
        marker.addListener('dragend', () => {
            const position = marker.getPosition();
            setLocation(`${position.lat()}, ${position.lng()}`);
        });

        // Add a listener to the map for clicking
        map.addListener('click', (event) => {
            const { latLng } = event;
            const position = {
                lat: latLng.lat(),
                lng: latLng.lng(),
            };
            marker.setPosition(position);
            setLocation(`${position.lat}, ${position.lng}`);
        });

    }, [setLocation]);

    return <div ref={mapRef} className="w-full h-64 rounded" />;
};

export default GoogleMap;
