import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const Footer = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleFeedbackClick = () => {
    const user = auth.currentUser;
    if (user) {
      navigate('/Feedback'); // If the user is logged in, go to Feedback page
    } else {
      navigate('/signIn'); // If the user is not logged in, go to SignIn page
    }
  };

  return (
    <footer className="bg-gray-800 text-white p-6 w-full flex flex-col md:flex-row items-center md:justify-between">
      <div className="container mx-auto flex justify-between items-center">
        
        <button
          onClick={handleFeedbackClick}
          className="text-sm hover:underline cursor-pointer"
        >
          Give Feedback
        </button>
      </div>
      <p className="text-sm">© 2024 Car Dealership. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
