import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import sampleImage from '../assets/CarPlaceholdr.jpg';
import Card1 from '../components/Card1';

const carData = [
  { 
    id: Date.now(), 
    name: 'CAR1', 
    overview: 'This is a test car.', 
    price: '2000', 
    engine: 'V8', 
    fuelType: 'Petrol', 
    transmission: 'Manual', 
    mileage: '15', 
    color: 'Red', 
    tyreSize: '16', 
    seatingCapacity: '4', 
    reg_no: 'ABC1234', 
    reg_date: '2020-01-01', 
    owner_name: 'John Doe', 
    owner_father_name: 'John Sr.', 
    current_address_line1: '123 Main St', 
    current_address_line2: '', 
    current_district_name: 'Central', 
    current_state: 'New York', 
    current_pincode: '10001', 
    permanent_address_line1: '456 Another St', 
    permanent_address_line2: '', 
    permanent_district_name: 'North', 
    permanent_state: 'New York', 
    permanent_pincode: '10002', 
    chassis_no: 'CHASSIS1234', 
    engine_no: 'ENGINE1234', 
    vehicle_manufacturer_name: 'Ford', 
    model: 'Mustang', 
    body_type: 'Coupe', 
    vehicle_class_desc: 'Passenger Vehicle', 
    vehicle_gross_weight: '1500kg', 
    cubic_cap: '5000cc', 
    insurance_upto: '2025-01-01', 
    insurance_company_name: 'Geico', 
    permit_valid_upto: '2023-12-31', 
    pucc_upto: '2023-12-31', 
    image: sampleImage
  },
  { 
    id: Date.now() + 1, 
    name: 'CAR2', 
    overview: 'This car has a powerful diesel engine.', 
    price: '3500', 
    engine: 'V6', 
    fuelType: 'Diesel', 
    transmission: 'Automatic', 
    mileage: '18', 
    color: 'Blue', 
    tyreSize: '17', 
    seatingCapacity: '5', 
    reg_no: 'DEF5678', 
    reg_date: '2019-06-15', 
    owner_name: 'Jane Smith', 
    owner_father_name: 'Robert Smith', 
    current_address_line1: '789 Oak St', 
    current_address_line2: 'Apt 4B', 
    current_district_name: 'East Side', 
    current_state: 'California', 
    current_pincode: '90001', 
    permanent_address_line1: '123 Maple St', 
    permanent_address_line2: '', 
    permanent_district_name: 'West Side', 
    permanent_state: 'California', 
    permanent_pincode: '90002', 
    chassis_no: 'CHASSIS5678', 
    engine_no: 'ENGINE5678', 
    vehicle_manufacturer_name: 'Toyota', 
    model: 'Camry', 
    body_type: 'Sedan', 
    vehicle_class_desc: 'Passenger Vehicle', 
    vehicle_gross_weight: '1800kg', 
    cubic_cap: '3000cc', 
    insurance_upto: '2024-07-20', 
    insurance_company_name: 'Allstate', 
    permit_valid_upto: '2023-10-15', 
    pucc_upto: '2023-09-30', 
    image: sampleImage
  },
  { 
    id: Date.now() + 2, 
    name: 'CAR3', 
    overview: 'Compact electric vehicle with great mileage.', 
    price: '5000', 
    engine: 'Electric', 
    fuelType: 'Electric', 
    transmission: 'Automatic', 
    mileage: '100', 
    color: 'Green', 
    tyreSize: '15', 
    seatingCapacity: '4', 
    reg_no: 'GHI9101', 
    reg_date: '2021-03-10', 
    owner_name: 'Alice Johnson', 
    owner_father_name: 'Richard Johnson', 
    current_address_line1: '101 Pine St', 
    current_address_line2: '', 
    current_district_name: 'South District', 
    current_state: 'Texas', 
    current_pincode: '75001', 
    permanent_address_line1: '202 Birch St', 
    permanent_address_line2: '', 
    permanent_district_name: 'North District', 
    permanent_state: 'Texas', 
    permanent_pincode: '75002', 
    chassis_no: 'CHASSIS9101', 
    engine_no: 'ENGINE9101', 
    vehicle_manufacturer_name: 'Tesla', 
    model: 'Model 3', 
    body_type: 'Sedan', 
    vehicle_class_desc: 'Electric Vehicle', 
    vehicle_gross_weight: '1600kg', 
    cubic_cap: 'N/A', 
    insurance_upto: '2026-01-01', 
    insurance_company_name: 'State Farm', 
    permit_valid_upto: '2024-03-31', 
    pucc_upto: '2024-01-01', 
    image: sampleImage
  },
  { 
    id: Date.now() + 3, 
    name: 'CAR4', 
    overview: 'Luxury SUV with premium features.', 
    price: '7000', 
    engine: 'V8 Turbo', 
    fuelType: 'Petrol', 
    transmission: 'Automatic', 
    mileage: '12', 
    color: 'Black', 
    tyreSize: '18', 
    seatingCapacity: '7', 
    reg_no: 'JKL1122', 
    reg_date: '2018-11-22', 
    owner_name: 'Michael Brown', 
    owner_father_name: 'Thomas Brown', 
    current_address_line1: '222 Cedar St', 
    current_address_line2: '', 
    current_district_name: 'Downtown', 
    current_state: 'Florida', 
    current_pincode: '33101', 
    permanent_address_line1: '333 Spruce St', 
    permanent_address_line2: '', 
    permanent_district_name: 'Uptown', 
    permanent_state: 'Florida', 
    permanent_pincode: '33102', 
    chassis_no: 'CHASSIS1122', 
    engine_no: 'ENGINE1122', 
    vehicle_manufacturer_name: 'BMW', 
    model: 'X5', 
    body_type: 'SUV', 
    vehicle_class_desc: 'Luxury SUV', 
    vehicle_gross_weight: '2500kg', 
    cubic_cap: '4400cc', 
    insurance_upto: '2024-08-15', 
    insurance_company_name: 'Progressive', 
    permit_valid_upto: '2023-11-30', 
    pucc_upto: '2023-10-01', 
    image: sampleImage
  }
]
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
  const [selectedCar, setSelectedCar] = useState(null); // Track the selected car for display

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
          <div className="flex flex-wrap gap-4">
            {filteredCars.length > 0 ? (
              filteredCars.map((car, index) => (
                <div
                  key={index}
                  onClick={() => handleCarClick(car)}
                  className="cursor-pointer"
                >
                  <Card1 img={car.image} title={car.name} text={`$${car.price}`} />
                </div>
              ))
            ) : (
              <p>No cars match the selected filters.</p>
            )}
          </div>

          {/* Display clicked car details */}
          {selectedCar && (
            <div className="border-2 border-gray-300 p-5 rounded-lg mt-4">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarSales;
