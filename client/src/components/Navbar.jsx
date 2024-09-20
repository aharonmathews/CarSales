import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

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
    <div className='flex flex-row min-h-16 border-b-2 border-black justify-between'> {/* navbar */}
      <div className='flex flex-row'>
        <div className='flex flex-row items-center ml-3 mr-8 hover:cursor-pointer' onClick={() => navigate('/')}>
          Logo
        </div>
        
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            id="search" 
            className='max-w-[40rem] min-w-[25rem] p-1 flex border-2  m-5 px-3 py-1 rounded-lg' placeholder='Search'
            onChange={(e) => setSearch(e.target.value)} />
        </form>
      </div>
      
      <div className='flex flex-row gap-7 items-center justify-center mr-10'>
        <a className='flex flex-row hover:cursor-pointer hover:text-zinc-600 border-b-2' onClick={() => navigate("/wishlist")}>
          Wishlist
        </a>
        <p className='border-b-2'>
          Location
        </p>
        {user ? (
          <>
            <button onClick={handleProfileClick} className='border-2 border-gray-500 bg-slate-200 px-3 py-1 rounded-lg hover:bg-slate-300'>
              {user.displayName || user.email}
            </button>
            <button onClick={handleSignOut} className='border-2 border-gray-500 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700'>
              Sign Out
            </button>
          </>
        ) : (
          <button className='border-2 border-gray-500 bg-slate-200 px-3 py-1 rounded-lg hover:bg-slate-300' onClick={() => navigate("/signIn")} target="_blank">
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;