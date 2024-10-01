import React, { useState } from 'react';

const locations = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
  'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Nagpur'
  // Add more locations as needed
];

const LocationMenu = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Location🌐");

  const handleLocationClick = (location) => {
    setSelectedLocation(location); // Update the button label with the selected location
    setShowDropdown(false); // Close the dropdown
  };

  return (
    <div className="relative inline-block text-left">
      {/* Button to open the dropdown */}
      <button
        type="button"
        className="e1 hover:underline hover:cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility
      >
        {selectedLocation}
      </button>

      {/* Dropdown menu */}
      {showDropdown && (
        <div className="absolute mt-5 mr-3 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1 max-h-60 overflow-y-auto">
            {locations.map((location, index) => (
              <div
                key={index}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleLocationClick(location)}
              >
                {location}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMenu;
