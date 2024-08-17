import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Card1 = ({ img, title, text }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to the CarDetails page, passing the car data via state
    navigate(`/car-details`, { state: { img, title, text } });
  };

  return (
    <div
      className="w-full max-w-sm min-h-[18rem] border-2 border-black mb-5 rounded-xl hover:cursor-pointer hover:shadow-lg hover:scale-105 transform duration-200"
      onClick={handleCardClick}
      role="button"
      aria-label={`View details for ${title}`}
    >
      <img
        src={img}
        alt={`Image of ${title}`}
        className="rounded-t-xl shadow-lg object-cover w-full h-48"
      />
      <div className="p-4">
        <h1 className="font-semibold text-2xl">{title}</h1>
        <p className="text-gray-600">₹{text}</p>
      </div>
    </div>
  );
};

Card1.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Card1;
