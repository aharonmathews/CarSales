import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-10 ">
      <div className=" mx-auto flex justify-between items-center">
        <p className="text-sm">© 2024 Car Dealership. All rights reserved.</p>
        <Link to="/Feedback" className="text-sm hover:underline">
          Give Feedback
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
