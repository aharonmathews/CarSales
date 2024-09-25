import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to get car details

const MakeAnOffer = () => {
  const [offerPrice, setOfferPrice] = useState('');
  const [bargain, setBargain] = useState('');
  const location = useLocation(); // To receive passed car data
  const { img, title, text } = location.state || {}; // Destructure received car data

  // Handle offer price change
  const handleOfferChange = (event) => {
    setOfferPrice(event.target.value);
  };

  // Handle bargain text change
  const handleBargainChange = (event) => {
    setBargain(event.target.value);
  };

  // Handle offer submission
  const handleSubmitOffer = () => {
    alert(`Offer submitted for ${title}:\nPrice: ₹${offerPrice}\nBargain: ${bargain}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Make an Offer for {title}</h2>

        {/* Display the car image */}
        {img && (
          <div className="mb-4">
            <img src={img} alt={title} className="w-full h-48 object-cover rounded-md" />
          </div>
        )}

        {/* Display the car price */}
        <p className="text-lg text-gray-700 mb-4">Price: ₹{text}</p>

        {/* Offer Price Input */}
        <div className="mb-4">
          <label htmlFor="offer-price" className="block text-sm font-medium text-gray-700">
            Offer Price
          </label>
          <input
            type="number"
            id="offer-price"
            value={offerPrice}
            onChange={handleOfferChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter your offer price"
          />
        </div>

        {/* Bargain Details Input */}
        <div className="mb-4">
          <label htmlFor="bargain" className="block text-sm font-medium text-gray-700">
            Bargain Details
          </label>
          <textarea
            id="bargain"
            value={bargain}
            onChange={handleBargainChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter your bargaining points or comments"
          />
        </div>

        {/* Submit Offer Button */}
        <button
          onClick={handleSubmitOffer}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit Offer
        </button>
      </div>
    </div>
  );
};

export default MakeAnOffer;
