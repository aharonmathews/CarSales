import LocationMenu from './Location';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import carLinkImg from '../assets/CarLink.png';
import { FaUserCircle } from 'react-icons/fa'; // Account icon

const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(search)}`);
  };

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/'); // Redirect to home page after sign-out
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='bg-gray-800 p-3 flex flex-row min-h-16 border-b-2 border-black justify-between'> {/* navbar */}
      <div className='flex flex-row'>
        <div className='flex flex-row items-center ml-3 mr-8 hover:cursor-pointer ' onClick={() => navigate('/')}>
          <img src={carLinkImg} alt="Car Link" className='h-16 rounded-md' />
        </div>
        
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            id="search" 
            className='max-w-[40rem] min-w-[46rem] p-1 flex border-2  m-5 px-3 py-1 rounded-lg' 
            placeholder='Search'
            onChange={(e) => setSearch(e.target.value)} 
          />
        </form>
      </div>
      
      <div className='flex flex-row gap-7 items-center justify-center mr-10'>
        <button className='e1 text-white border-b-2 hover:border-b-black hover:cursor-pointer' onClick={() => navigate("/wishlist")}>
          Wishlist
        </button>
        <LocationMenu />
        {user ? (
          <div className='relative'>
            {/* Account icon with click event to toggle dropdown */}
            <FaUserCircle className='text-4xl text-white cursor-pointer' onClick={toggleDropdown} />
            
            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className='z-50 absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg'>
                <FaUserCircle className='text-7xl mt-4 text-gray cursor-pointer m-auto '/>
                <div className='px-2 py-2 text-sm font-semibold text-gray-800 cursor-pointer text-center items-center' onClick={handleProfileClick} >
                    {user.name || user.email}
                  
                </div>
                <button 
                  onClick={handleSignOut} 
                  className='block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            className='border-2 border-gray-500 bg-slate-200 px-3 py-1 rounded-lg hover:bg-slate-300' 
            onClick={() => navigate("/signIn")}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
