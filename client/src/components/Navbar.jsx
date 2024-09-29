import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import LocationMenu from './Location';
import Footer from './Footer';

const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

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
    navigate(`/search?query=${search}`);
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

  return (
    <div className='flex flex-row min-h-16 border-b-2 border-black justify-between shadow-lg'> {/* navbar */}
      <div className="box1 flex space-x-5 items-center">
                <div className="logo m-8" onClick={()=> navigate("/")}>Logo</div>
                <div className="sbar w-200">
                  <input type="text" placeholder="Search..." className="w-80 p-2 border-2 border-gray-300 focus:bg-gray-100 outline-none" onChange={(e)=>setSearch(e.target.value)}/>
                </div>
              </div>
      
      <div className='flex flex-row gap-7 items-center justify-center mr-10'>
        <a className='e1 hover:underline hover:cursor-pointer' onClick={()=> navigate("/wishlist")}>
          Wishlist
        </a>
        <LocationMenu />

        <button className='button border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors' onClick={() => navigate("/signIn")} target="_blank">
          Sign In
        </button> 
      </div>
      
    </div>
    
  );
};

export default Navbar;