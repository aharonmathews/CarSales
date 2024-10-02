import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import sampleImage from '../assets/CarPlaceholdr.jpg';
import Card1 from '../components/Card1';

const carData = [
  { id: 1, image: sampleImage, name: 'CAR1', price: 2000, insurance: true, hasAccident: false, owner: '1st', fuelType: 'Petrol' },
  { id: 2, image: sampleImage, name: 'CAR2', price: 4000, insurance: false, hasAccident: true, owner: '2nd', fuelType: 'Diesel' },
  { id: 3, image: sampleImage, name: 'CAR3', price: 7000, insurance: true, hasAccident: false, owner: '3rd', fuelType: 'CNG' },
  // More cars...
];

const CarSales = () => {
  const [checkboxes, setCheckboxes] = useState({
    basicDetails: {
      insurance: true,
      'no accident': true,
    },
    owners: {
      '1st': true,
      '2nd': true,
      '3rd': true,
    },
    fuel: {
      Petrol: true,
      Diesel: true,
      CNG: true,
    },
  });
  const [filteredCars, setFilteredCars] = useState(carData);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();

  // Apply filters function
  const applyFilters = () => {
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('query') || '';

    const filtered = carData.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Only apply insurance filter if it's selected
      const matchesInsurance = checkboxes.basicDetails.insurance ? car.insurance : true;

      // Only apply accident filter if it's selected
      const matchesAccident = checkboxes.basicDetails['no accident'] ? !car.hasAccident : true;

      // Check if no owner checkboxes are selected
      const noOwnersSelected = Object.values(checkboxes.owners).every(selected => !selected);
      // Apply owner filters only if at least one owner type is selected
      const matchesOwner = 
        noOwnersSelected ||  // If no owners are selected, match all owners
        (checkboxes.owners['1st'] && car.owner === '1st') ||
        (checkboxes.owners['2nd'] && car.owner === '2nd') ||
        (checkboxes.owners['3rd'] && car.owner === '3rd');

      // Check if no fuel type checkboxes are selected
      const noFuelSelected = Object.values(checkboxes.fuel).every(selected => !selected);
      // Apply fuel filter only if one or more fuel types are selected
      const matchesFuel = 
        noFuelSelected ||  // If no fuel types are selected, match all fuel types
        (checkboxes.fuel.Petrol && car.fuelType === 'Petrol') ||
        (checkboxes.fuel.Diesel && car.fuelType === 'Diesel') ||
        (checkboxes.fuel.CNG && car.fuelType === 'CNG');

      return matchesSearch && matchesInsurance && matchesAccident && matchesOwner && matchesFuel;
    });

    setFilteredCars(filtered);
  };

  // Handle opening modal to confirm filter application
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle confirming filter application
  const handleConfirmApplyFilters = () => {
    applyFilters();
    setShowModal(false);
  };

  return (
    <div>
      <Navbar />
      <div className="flex p-5">
        <div className="w-1/5 pr-5 flex flex-col m-1 border-2 border-[#bcbcbc] rounded-md p-4">
          {/* Existing filters and checkboxes */}
          <div className="mb-4">
            <p className='mb-1'>Basic Details</p>
            {Object.keys(checkboxes.basicDetails).map(key => (
              <label className="block mb-1" key={key}>
                <input
                  type="checkbox"
                  checked={checkboxes.basicDetails[key]}
                  onChange={() => setCheckboxes({
                    ...checkboxes,
                    basicDetails: {
                      ...checkboxes.basicDetails,
                      [key]: !checkboxes.basicDetails[key],
                    },
                  })}
                  className="mr-1 accent-black h-3"
                />
                {key}
              </label>
            ))}
          </div>

          {/* Owners filter */}
          <div className="mb-4">
            <p className='mb-1'>Owners</p>
            {Object.keys(checkboxes.owners).map(key => (
              <label className="block mb-1" key={key}>
                <input
                  type="checkbox"
                  checked={checkboxes.owners[key]}
                  onChange={() => setCheckboxes({
                    ...checkboxes,
                    owners: {
                      ...checkboxes.owners,
                      [key]: !checkboxes.owners[key],
                    },
                  })}
                  className="mr-1 accent-black h-3"
                />
                {key} owner
              </label>
            ))}
          </div>

          {/* Fuel type filter */}
          <div className="mb-4">
            <p className='mb-1'>Fuel Type</p>
            {Object.keys(checkboxes.fuel).map(key => (
              <label className="block mb-1" key={key}>
                <input
                  type="checkbox"
                  checked={checkboxes.fuel[key]}
                  onChange={() => setCheckboxes({
                    ...checkboxes,
                    fuel: {
                      ...checkboxes.fuel,
                      [key]: !checkboxes.fuel[key],
                    },
                  })}
                  className="mr-1 accent-black h-3"
                />
                {key}
              </label>
            ))}
          </div>

          <button onClick={handleOpenModal} className="bg-black text-white p-2 rounded">
            Apply Filters
          </button>
        </div>

        <div className="w-4/5 pl-5">
          {/* Display filtered cars */}
          <div className="flex flex-wrap gap-4">
            {filteredCars.length > 0 ? (
              filteredCars.map((car, index) => (
                <div key={index}>
                  <Card1 img={car.image} title={car.name} text={`$${car.price}`} />
                </div>
              ))
            ) : (
              <p>No cars match the selected filters.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md">
            <h2>Apply Filters</h2>
            <p>Are you sure you want to apply the selected filters?</p>
            <div className="mt-4">
              <button onClick={handleConfirmApplyFilters} className="bg-green-500 text-white p-2 rounded mr-2">
                Apply
              </button>
              <button onClick={handleCloseModal} className="bg-red-500 text-white p-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarSales;
