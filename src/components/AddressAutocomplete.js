import React, { useRef, useState, useEffect, useCallback } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";

const AddressAutocomplete = ({ value, onChange, onLocationSelect }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const initAutocomplete = useCallback(() => {
    if (!window.google || !inputRef.current || autocompleteRef.current) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      { types: ["address"] }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      if (!place.geometry) return;

      const address = place.formatted_address;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      onChange(address);
      onLocationSelect({ address, latitude: lat, longitude: lng });
    });
  }, [onChange, onLocationSelect]);

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      initAutocomplete();
      return;
    }

    // Check if a script is already loading
    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com"]'
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        setIsLoaded(true);
        initAutocomplete();
      });
      return;
    }

    // Load Google Maps script
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_KEY;
    if (!apiKey) {
      console.warn("Google Maps API key not set (REACT_APP_GOOGLE_MAPS_KEY)");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsLoaded(true);
      initAutocomplete();
    };
    document.head.appendChild(script);
  }, [initAutocomplete]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Address
      </label>
      <div className="relative">
        <HiOutlineLocationMarker className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            isLoaded
              ? "Start typing your address..."
              : "Enter your address (Google Maps autocomplete requires API key)"
          }
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
      </div>
      {!isLoaded && !process.env.REACT_APP_GOOGLE_MAPS_KEY && (
        <p className="mt-1 text-xs text-amber-600">
          ℹ️ Set REACT_APP_GOOGLE_MAPS_KEY in .env for address autocomplete & map
        </p>
      )}
    </div>
  );
};

export default AddressAutocomplete;
