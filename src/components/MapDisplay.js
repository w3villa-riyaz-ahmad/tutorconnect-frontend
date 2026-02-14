import React, { useEffect, useRef, useState } from "react";

const MapDisplay = ({ latitude, longitude, address }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsLoaded(true);
    }

    // Listen for google maps load if not ready yet
    const checkLoaded = setInterval(() => {
      if (window.google && window.google.maps) {
        setIsLoaded(true);
        clearInterval(checkLoaded);
      }
    }, 500);

    return () => clearInterval(checkLoaded);
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !latitude || !longitude) return;

    const position = { lat: parseFloat(latitude), lng: parseFloat(longitude) };

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: position,
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      markerRef.current = new window.google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        title: address || "Your location",
        animation: window.google.maps.Animation.DROP,
      });
    } else {
      mapInstanceRef.current.setCenter(position);
      markerRef.current.setPosition(position);
      markerRef.current.setTitle(address || "Your location");
    }
  }, [isLoaded, latitude, longitude, address]);

  if (!latitude || !longitude) {
    return (
      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
        <p className="text-sm text-gray-400">
          Add an address to see it on the map
        </p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
        <p className="text-sm text-gray-400">
          {process.env.REACT_APP_GOOGLE_MAPS_KEY
            ? "Loading map..."
            : "Set REACT_APP_GOOGLE_MAPS_KEY to enable map"}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default MapDisplay;
