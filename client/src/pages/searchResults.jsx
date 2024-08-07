import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Navbar from '../components/Navbar';
import sampleImage from '../assets/searchSampleImage.jpg';
import { IoMdSearch } from "react-icons/io";


const carData = [
  { id: 1,image : sampleImage, name: 'CAR1', price: 2000 },
  { id: 2,image : sampleImage, name: 'CAR2', price: 2000 },
  { id: 3,image : sampleImage, name: 'CAR3', price: 2000 },
  { id: 4,image : sampleImage, name: 'CAR4', price: 2000 },
  { id: 5,image : sampleImage, name: 'CAR5', price: 2000 },
  { id: 6,image : sampleImage, name: 'CAR6', price: 2000 },
];

const CarSales = () => {
  const [filters, setFilters] = useState(['Maruthi', 'Power steering', 'rear cam']);
  const [budget, setBudget] = useState(100);
  const [newFilter, setNewFilter] = useState('');
  const [checkboxes, setCheckboxes] = useState({
    insurance: true,
    noAccident: true,
    firstOwner: true,
    secondOwner: true,
    thirdOwner: true,
    petrol: true,
    diesel: true,
    cng: true
  });

  const handleSliderChange = (value) => {
    setBudget(value);
  };

  const handleAddFilter = () => {
    if (newFilter.trim()) {
      setFilters([...filters, newFilter.trim()]);
      setNewFilter('');
    }
  };

  const handleRemoveFilter = (filter) => {
    setFilters(filters.filter(f => f !== filter));
  };

  const handleCheckboxChange = (checkbox) => {
    setCheckboxes({
      ...checkboxes,
      [checkbox]: !checkboxes[checkbox]
    });
  };

  return (
    <div>
        <Navbar />
        <div className="flex p-5">
    
      <div className="w-1/5 pr-5 flex flex-col m-10 border-2 border-[#bcbcbc]  p-4">
        <div>
          {filters.map((filter, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 px-2 py-1 m-1 rounded relative"
            >
              {filter}
              <span
                onClick={() => handleRemoveFilter(filter)}
                className="absolute top-0 right-0 cursor-pointer text-gray-500"
              >
                &times;
              </span>
            </span>
          ))}
        </div>
        <div className="flex mb-4">
          <input
            type="text"
            value={newFilter}
            onChange={(e) => setNewFilter(e.target.value)}
            placeholder="Type filters"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleAddFilter}
            className="ml-2 p-2 bg-black text-white rounded"
          >
            Add Filter
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={checkboxes.insurance}
              onChange={() => handleCheckboxChange('insurance')}
              className="mr-2 accent-black "
            /> insurance
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={checkboxes.noAccident}
              onChange={() => handleCheckboxChange('noAccident')}
              className="mr-2 accent-black "
            /> no accident
          </label>
        </div>
        <div className="mb-4">
          <p>Budget ₹{budget}K</p>
          <Slider
            min={10000}
            max={2000000}
            value={budget}
            onChange={handleSliderChange}
            handleStyle={{ marginBottom: '10px' }}
          />
          <div className="text-center mt-2">{budget}K</div>
        </div>
        <div className="mb-4">
          <p>Owners</p>
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={checkboxes.firstOwner}
              onChange={() => handleCheckboxChange('firstOwner')}
              className="mr-2 accent-black "
            /> 1st
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={checkboxes.secondOwner}
              onChange={() => handleCheckboxChange('secondOwner')}
              className="mr-2 accent-black "
            /> 2nd
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={checkboxes.thirdOwner}
              onChange={() => handleCheckboxChange('thirdOwner')}
              className="mr-2 accent-black "
            /> 3rd
          </label>
        </div>
        <div className="mb-4">
          <p>Fuel</p>
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={checkboxes.petrol}
              onChange={() => handleCheckboxChange('petrol')}
              className="mr-2 accent-black "
            /> Petrol
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={checkboxes.diesel}
              onChange={() => handleCheckboxChange('diesel')}
              className="mr-2 accent-black "
            /> Diesel
          </label>
          <label className="block mb-2">
            <input
              type="checkbox"
              checked={checkboxes.cng}
              onChange={() => handleCheckboxChange('cng')}
              className="mr-2 accent-black "
            /> CNG
          </label>
        </div>
      </div>
      <div className="w-4/5 pl-5">
      <div className='flex flex-row justify-between'>
        <div className="flex justify-between mb-4 w-3/6 h-fit p-2 border border-gray-300 rounded">
          <input
            type="text"
            placeholder="Search"
            className="w-7/12 p-2 rounded"
          >
          </input>
          <IoMdSearch className='text-2xl m-auto'/>
        </div>
        <div className="flex justify-start space-x-4 mb-4">
          <button className="bg-black text-white p-2 rounded">New</button>
          <button className="bg-gray-200 p-2 rounded">Price ascending</button>
          <button className="bg-gray-200 p-2 rounded">Price descending</button>
          <button className="bg-gray-200 p-2 rounded">Rating</button>
        </div>
      </div>
        
        <div className="flex flex-wrap gap-4">
          {carData.map(car => (
            <div
              key={car.id}
              className="w-1/3 border border-gray-300 rounded p-2 text-center"
            >
              <img src={car.image} alt={car.name} className="w-full h-32 object-cover rounded-sm" />
              <p className='text-xl font-semibold'>{car.name}</p>
              <p>₹{car.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default CarSales;
