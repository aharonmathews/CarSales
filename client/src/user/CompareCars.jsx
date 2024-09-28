import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CompareCars = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { car1, car2 } = location.state || {};

  if (!car1 || !car2) {
    return <div>No cars to compare.</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold mb-6">Compare Cars</h2>
        <div className="flex gap-6">
          <div className="flex-1 p-4 border rounded-lg">
            <img
              src={car1.img}
              alt={car1.title}
              className="w-full h-auto rounded-lg shadow-lg mb-4"
            />
            <h3 className="text-2xl font-semibold">{car1.title}</h3>
            <p className="text-lg text-green-600">₹{car1.text}</p>
            <div className="mt-4">{/* Car 1 Details Here */}</div>
          </div>
          <div className="flex-1 p-4 border rounded-lg">
            <img
              src={car2.img}
              alt={car2.title}
              className="w-full h-auto rounded-lg shadow-lg mb-4"
            />
            <h3 className="text-2xl font-semibold">{car2.title}</h3>
            <p className="text-lg text-green-600">₹{car2.text}</p>
            <div className="mt-4">{/* Car 2 Details Here */}</div>
          </div>
        </div>
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Back to Car Listings
        </button>
      </div>
    </div>
  );
};

export default CompareCars;
