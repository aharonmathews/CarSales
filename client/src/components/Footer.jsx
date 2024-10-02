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
    <footer className="bg-gray-800 text-white p-6 mt-10">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">© 2024 Car Dealership. All rights reserved.</p>
        <button
          onClick={handleFeedbackClick}
          className="text-sm hover:underline cursor-pointer"
        >
          Give Feedback
        </button>
      </div>
    </footer>
  );
};

export default Footer;
