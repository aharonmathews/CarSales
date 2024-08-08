import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Navbar from '../components/Navbar';
import sampleImage from '../assets/CarPlaceholdr.jpg';
import { IoMdSearch } from "react-icons/io";
import Card1 from '../components/Card1';

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
  const [budget, setBudget] = useState([10000, 2000000]);
  const [newFilter, setNewFilter] = useState('');
  const [mainFilters, setMainFilters] = useState(['New','Price Acending', 'Price Descending', 'Rating']);
  
  const [checkboxes, setCheckboxes] = useState({
    basicDetails: {
      'insurance': true,
      'no accident': true,
    },
    owners: {
      '1st': true,
      '2nd': true,
      '3rd': true,
    },
    fuel: {
      'Psetrol': true,
      'Diesel': true,
      'CNG': true,
    }
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

  const handleCheckboxChange = (group, checkbox) => {
    setCheckboxes({
      ...checkboxes,
      [group]: {
        ...checkboxes[group],
        [checkbox]: !checkboxes[group][checkbox],
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="flex p-5">
        <div className="w-1/5 pr-5 flex flex-col m-1 border-2 border-[#bcbcbc] rounded-md p-4">
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
              className=" p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleAddFilter}
              className="ml-2 p-2 bg-black text-white rounded"
            >
              Add Filter
            </button>
          </div>
          <div className="mb-4">
            <p>Basic Details</p>
            {Object.keys(checkboxes.basicDetails).map((key) => (
              <label className="block mb-2" key={key}>
                <input
                  type="checkbox"
                  checked={checkboxes.basicDetails[key]}
                  onChange={() => handleCheckboxChange('basicDetails', key)}
                  className="mr-1 accent-black h-3"
                /> {key}
              </label>
            ))}
          </div>
          <div className="mb-4">
            <p>Budget ₹{budget[0]} - ₹{budget[1]}</p>
            <Slider range min={10000} max={2000000} className='accent-black border-black' value={budget} onChange={handleSliderChange}  defaultValue={[10000, 2000000]} />
          </div>
          <div className="mb-4">
            <p>Owners</p>
            {Object.keys(checkboxes.owners).map((key) => (
              <label className="block mb-2" key={key}>
                <input
                  type="checkbox"
                  checked={checkboxes.owners[key]}
                  onChange={() => handleCheckboxChange('owners', key)}
                  className="mr-1 accent-black h-3"
                /> {key}
              </label>
            ))}
          </div>
          <div className="mb-4">
            <p>Fuel</p>
            {Object.keys(checkboxes.fuel).map((key) => (
              <label className="block mb-2" key={key}>
                <input type="checkbox" checked={checkboxes.fuel[key]} onChange={() => handleCheckboxChange('fuel', key)} className="mr-1 accent-black h-3"/> {key}
              </label>
            ))}
          </div>
        </div>
        <div className="w-4/5 pl-5">
          <div className='flex flex-row justify-between'>
              <input
                type="text" placeholder="Search" className="w-4/12 py-2 px-4 h-fit rounded-3xl border border-gray-300"></input>
              
            <div className="flex justify-start space-x-4 mb-4">
              <button className="bg-black text-white p-2 h-fit rounded">New</button>
              <button className="bg-gray-200 p-2 h-fit rounded">Price ascending</button>
              <button className="bg-gray-200 p-2 h-fit rounded">Price descending</button>
              <button className="bg-gray-200 p-2 h-fit rounded">Rating</button>
            </div>  
          </div>
          <div className="flex flex-wrap gap-4">
            {carData.map((car,index) => (
              <div key={index} >
              
                <Card1  img={car.image} title={car.name} text={car.price} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarSales;
