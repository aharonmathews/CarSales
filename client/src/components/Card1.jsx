import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Card1 = ({img, title, text}) => {
  const navigate = useNavigate();
  return (
    <>
    <div className='w-[20rem] min-h-[18rem] border-2 border-black mb-5 rounded-xl hover:cursor-pointer hover:shadow-md hover:scale-105 transform duration-200' onClick={() => navigate(`/view/${title}`)} >
      <img src={img} alt={title} className='rounded-t-xl shadow-lg'/>
      <h1 className='flex flex-row font-semibold text-2xl p-2'>{title}</h1>
      <p className='px-3'>{text}</p>
    </div>
    
    </>
  )
}

Card1.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Card1;