import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming you have Firebase initialized
import Navbar from './Navbar';

const CarDetails = () => {
  const { id: carID } = useParams(); // Get carID from URL params
  const [carData, setCarData] = useState(null);
  const navigate = useNavigate();

  // Fetch car details from Firestore
  useEffect(() => {
    const fetchCarData = async () => {
      const docRef = doc(db, 'vehicles', carID);
      const carDoc = await getDoc(docRef);
      if (carDoc.exists()) {
        setCarData(carDoc.data());
      }
    };

    fetchCarData();
  }, [carID]);

  const handleHideCar = async () => {
    const docRef = doc(db, 'vehicles', carID);
    await updateDoc(docRef, { hidden: true });
    setCarData((prevData) => ({ ...prevData, hidden: true }));
  };

  const handleUnhideCar = async () => {
    const docRef = doc(db, 'vehicles', carID);
    await updateDoc(docRef, { hidden: false });
    setCarData((prevData) => ({ ...prevData, hidden: false }));
  };

  const handleBoostCar = async () => {
    const docRef = doc(db, 'vehicles', carID);
    await updateDoc(docRef, { isboosting: true });
    setCarData((prevData) => ({ ...prevData, isboosting: true }));
  };

  if (!carData) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className='mx-10 my-10'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h1 className='text-4xl font-extrabold '>{carData.name}</h1>
            <img
              className="rounded-xl shadow-xl w-10/12"
              src={carData.images[0] || "https://imgd.aeplcdn.com/370x208/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-71.jpeg?isig=0&q=80"}
              alt={carData.name}
              draggable="false"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <div className="p-4 bg-blue-100 rounded-xl shadow-md">
              <h2 className="text-xl font-bold">Price</h2>
              <p className="text-lg">Rs. {carData.price}</p>
            </div>
            
            <button
              onClick={() => navigate(`/addNewVehicle/${carID}`)} // Navigate to Edit Details page
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Edit Details
            </button>

            {!carData.hidden ? (
              <button
                onClick={handleHideCar}
                className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Hide Car
              </button>
            ) : (
              <button
                onClick={handleUnhideCar}
                className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                Unhide Car
              </button>
            )}
          </div>
        </div>

        <div className="mt-10 p-4 bg-blue-100 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-center">Boost your car!</h2>
          <p className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </div>

        {/* Dummy chart and details */}
        <div className="mt-10">
          <h2 className="text-center text-lg font-semibold mb-4">Clicks vs Impressions graph</h2>
          {/* Add your chart component here */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            {/* Chart content (e.g., a chart library like Chart.js) */}
            <p>Chart placeholder</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p>
            This car appeared in search results <span className="font-bold">{'<XX>'}</span> times in the past month.
          </p>
          <p>
            <span className="font-bold">{'<XX>'}</span> people reviewed this car in the past month.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
