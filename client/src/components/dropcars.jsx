// src/components/Dpmenu.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Dpmenu = ({ onCarSelect }) => {
  const [carNames, setCarNames] = useState([]); // State to store car names
  const [selectedCar, setSelectedCar] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchCarNames = async () => {
      const dealerDocs = await getDocs(collection(db, 'Cardatabase'));
      const carList = [];

      dealerDocs.forEach(doc => {
        // Each doc contains car names as field names
        const carData = doc.data();
        for (const carName in carData) {
          carList.push(carName); // Add car names to the list
        }
      });

      setCarNames(carList); // Update state with the car names
    };

    fetchCarNames();
  }, [db]);

  const filteredCars = carNames.filter(car =>
    car.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCarChange = (car) => {
    setSelectedCar(car);
    setIsOpen(false);
    onCarSelect(car); // Call the prop function to set the selected car in the parent
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative shadow-lg z-50'>
      <button
        onClick={toggleDropdown}
        className='mt-2 px-4 py-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-600'
      >
        {selectedCar ? selectedCar : 'Select a car'}
      </button>

      {isOpen && (
        <div className='absolute mt-2 w-60 p-2 border border-black rounded bg-white shadow-lg z-50'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search cars...'
            className='block w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600'
          />
          <ul className='max-h-40 overflow-y-auto'>
            {filteredCars.length > 0 ? (
              filteredCars.map((car, index) => (
                <li
                  key={index}
                  onClick={() => handleCarChange(car)}
                  className='p-2 hover:bg-gray-200 cursor-pointer'
                >
                  {car}
                </li>
              ))
            ) : (
              <li className='p-2 text-gray-500'>No cars found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

Dpmenu.propTypes = {
  onCarSelect: PropTypes.func.isRequired,
};

export default Dpmenu;
