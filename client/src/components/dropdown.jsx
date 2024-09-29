// src/components/Locmenu.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Locmenu = ({ onLocationSelect, locations }) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setIsOpen(false);
    onLocationSelect(location); // Call the prop function to set the selected location in the parent
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative shadow-lg'>
      <button
        onClick={toggleDropdown}
        className='mt-2 px-4 py-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
      >
        {selectedLocation ? selectedLocation : 'Select a location'}
      </button>

      {isOpen && (
        <div className='absolute mt-2 w-60 p-2 border border-black rounded bg-white shadow-lg z-50'>
          {/* z-50 will make sure the dropdown appears on top of everything */}
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search locations...'
            className='block w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600'
          />
          <ul className='max-h-40 overflow-y-auto'>
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location, index) => (
                <li
                  key={index}
                  onClick={() => handleLocationChange(location)}
                  className='p-2 hover:bg-gray-200 cursor-pointer'
                >
                  {location}
                </li>
              ))
            ) : (
              <li className='p-2 text-gray-500'>No locations found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

Locmenu.propTypes = {
  onLocationSelect: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Locmenu;
