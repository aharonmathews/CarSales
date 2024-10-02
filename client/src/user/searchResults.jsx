import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import sampleImage from '../assets/CarPlaceholdr.jpg';
import Card1 from '../components/Card1';

// Car data remains the same
const carData = [
  // Same car data...
];

const CarSales = () => {
  const [filters, setFilters] = useState({
    name: '',
    minPrice: '',
    maxPrice: '',
    engine: '',
    fuelType: '',
    reg_no: '',
    owner_name: '',
  });

  const [filteredCars, setFilteredCars] = useState(carData);
  const [selectedCar, setSelectedCar] = useState(null); // For displaying car details

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const filtered = carData.filter(car => {
      const matchesName = filters.name ? car.name.toLowerCase().includes(filters.name.toLowerCase()) : true;
      const matchesMinPrice = filters.minPrice ? Number(car.price) >= Number(filters.minPrice) : true;
      const matchesMaxPrice = filters.maxPrice ? Number(car.price) <= Number(filters.maxPrice) : true;
      const matchesEngine = filters.engine ? car.engine === filters.engine : true;
      const matchesFuelType = filters.fuelType ? car.fuelType === filters.fuelType : true;
      const matchesRegNo = filters.reg_no ? car.reg_no.toLowerCase().includes(filters.reg_no.toLowerCase()) : true;
      const matchesOwnerName = filters.owner_name ? car.owner_name.toLowerCase().includes(filters.owner_name.toLowerCase()) : true;

      return matchesName && matchesMinPrice && matchesMaxPrice && matchesEngine && matchesFuelType && matchesRegNo && matchesOwnerName;
    });

    setFilteredCars(filtered);
  };

  const handleCarClick = (car) => {
    setSelectedCar(car); // Set the clicked car to show its details
  };

  return (
    <div>
      <Navbar />
      <div className="flex p-5">
        <div className="w-1/5 pr-5 flex flex-col m-1 border-2 border-[#bcbcbc] rounded-md p-4">
          {/* Filter inputs */}
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={filters.name}
              onChange={handleFilterChange}
              className="border-2 p-2 rounded-md w-full mb-2"
            />

            {/* Price range filter */}
            <div className="flex justify-between mb-2">
              <input
                type="number"
                name="minPrice"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="border-2 p-2 rounded-md w-1/2 mr-2"
              />
              <input
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="border-2 p-2 rounded-md w-1/2"
              />
            </div>

            {/* Engine Type Dropdown */}
            <div className="mb-4">
              <label className="block mb-1">Engine Type</label>
              <select 
                name="engine"
                value={filters.engine}
                onChange={handleFilterChange}
                className="border-2 p-2 rounded-md w-full mb-2"
              >
                <option value="">All Engines</option>
                <option value="V8">V8</option>
                <option value="V6">V6</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            {/* Fuel Type Dropdown */}
            <div className="mb-4">
              <label className="block mb-1">Fuel Type</label>
              <select 
                name="fuelType"
                value={filters.fuelType}
                onChange={handleFilterChange}
                className="border-2 p-2 rounded-md w-full mb-2"
              >
                <option value="">All Fuel Types</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            <input
              type="text"
              name="reg_no"
              placeholder="Registration No."
              value={filters.reg_no}
              onChange={handleFilterChange}
              className="border-2 p-2 rounded-md w-full mb-2"
            />

            <input
              type="text"
              name="owner_name"
              placeholder="Owner Name"
              value={filters.owner_name}
              onChange={handleFilterChange}
              className="border-2 p-2 rounded-md w-full mb-2"
            />

            <button onClick={applyFilters} className="bg-black text-white p-2 rounded mt-4">
              Apply Filters
            </button>
          </div>
        </div>

        <div className="w-4/5 pl-5">
          {selectedCar ? (
            <div className="border-2 border-gray-300 p-5 rounded-lg">
              {/* Display all car details */}
              <h2 className="text-2xl mb-2">{selectedCar.name}</h2>
              <img src={selectedCar.image} alt={selectedCar.name} className="mb-4" />
              <p><strong>Price:</strong> ${selectedCar.price}</p>
              <p><strong>Engine:</strong> {selectedCar.engine}</p>
              <p><strong>Fuel Type:</strong> {selectedCar.fuelType}</p>
              <p><strong>Transmission:</strong> {selectedCar.transmission}</p>
              <p><strong>Mileage:</strong> {selectedCar.mileage} km/l</p>
              <p><strong>Color:</strong> {selectedCar.color}</p>
              <p><strong>Tyre Size:</strong> {selectedCar.tyreSize} inch</p>
              <p><strong>Seating Capacity:</strong> {selectedCar.seatingCapacity}</p>
              <p><strong>Registration No:</strong> {selectedCar.reg_no}</p>
              <p><strong>Owner Name:</strong> {selectedCar.owner_name}</p>
              {/* Add other car details as needed */}
              <button
                onClick={() => setSelectedCar(null)} // Go back to the list
                className="mt-4 bg-gray-500 text-white p-2 rounded"
              >
                Back to List
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {filteredCars.length > 0 ? (
                filteredCars.map((car, index) => (
                  <div key={index} onClick={() => handleCarClick(car)} className="cursor-pointer">
                    <Card1 img={car.image} title={car.name} text={`$${car.price}`} />
                  </div>
                ))
              ) : (
                <p>No cars match the selected filters.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarSales;
