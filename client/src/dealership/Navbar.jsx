import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Track user authentication state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

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
    navigate('/profile'); // Redirect to profile page on profile button click
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-2xl font-bold" onClick={()=>navigate('/dealershipDashboard')}>
        websiteName
      </div>

      {/* Centered links */}
      <div className="flex space-x-4">
        <Link to="/inventory" className="text-white hover:text-gray-400">Inventory</Link>
        <Link to="/boost" className="text-white hover:text-gray-400">Boost</Link>
        <Link to="/profile" className="text-white hover:text-gray-400">Profile</Link>
      </div>

      {/* Right aligned user info and signout */}
      <div className="flex items-center space-x-2">
        {user ? (
          <>
            <button 
              onClick={handleProfileClick} 
              className='border-2 border-gray-500 bg-slate-200 px-3 py-1 rounded-lg hover:bg-slate-300'
            >
              {user.displayName || user.email} {/* Display user's name or email */}
            </button>
            <button 
              onClick={handleSignOut} 
              className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button 
            onClick={() => navigate("/signIn")} 
            className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
