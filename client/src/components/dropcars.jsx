import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Dpmenu = ({ onCarSelect }) => {
  const [selectedCar, setSelectedCar] = useState('');

  const cars = [
    { name: 'Maruti 800' },
    { name: 'Maruti 800' },
    { name: 'Honda City' },
    { name: 'Toyota Corolla' },
    { name: 'Ford Mustang' },
    { name: 'Tesla Model 3' },
  ];

  const handleCarChange = (e) => {
    const car = e.target.value;
    setSelectedCar(car);
    onCarSelect(car); // Call the prop function to set the selected car in the parent
  };

  return (
    <div className='relative'>     
      <select
        value={selectedCar}
        onChange={handleCarChange}
        className='block mt-2 w-60 p-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
      >
        <option value="" disabled>Select a car</option>
        {cars.map((car, index) => (
          <option key={index} value={car.name}>
            {car.name}
          </option>
        ))}
      </select>

      {selectedCar && (
        <div className="mt-4">
        </div>
      )}
    </div>
  );
};

Dpmenu.propTypes = {
  onCarSelect: PropTypes.func.isRequired,
};

export default Dpmenu;