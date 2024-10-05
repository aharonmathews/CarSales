import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';


const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState('');

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/'); // Redirect to home page after sign-out
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = doc(db, 'dealershipsInfo', user.email);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const data = userSnapshot.data();
          setUsername(data.ownerName); // Assuming the username is stored in ownerName
        }
      }
    });
  }, []);
  

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-2xl font-bold cursor-pointer" onClick={() => navigate('/dealership/dashboard')}>
        websiteName
      </div>
      <div className="hidden md:flex space-x-4 ml-[6%]">
        <Link to="/dealership/garageManagement" className="text-white hover:text-gray-400">Inventory</Link>
        <Link to="/dealership/boost" className="text-white hover:text-gray-400">Boost</Link>
        <Link to="/dealership/profile" className="text-white hover:text-gray-400">Profile</Link>
      </div>
      <div className='flex flex-row items-center justify-between '>
        <div className='text-white mr-5 py-2 px-3 rounded-md  border-1 border-black shadow-sm shadow-gray-400 bg-slate-500 hidden md:block'>
          User : {username}
        </div>
        <button 
          onClick={handleSignOut} 
          className="hidden md:block text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </div>
      
      <button 
        className="md:hidden text-white" 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
        </svg>
      </button>
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-800 flex flex-col items-center space-y-4 p-4">
          <Link to="/dealership/garageManagement" className="text-white hover:text-gray-400" onClick={() => setIsMenuOpen(false)}>Inventory</Link>
          <Link to="/dealership/boost" className="text-white hover:text-gray-400" onClick={() => setIsMenuOpen(false)}>Boost</Link>
          <Link to="/dealership/profile" className="text-white hover:text-gray-400" onClick={() => setIsMenuOpen(false)}>Profile</Link>
          <div className='text-white py-2 px-3 rounded-md  border-1 border-black shadow-sm shadow-gray-400 bg-slate-500'>
          User : {username}
        </div>
          <button 
            onClick={() => { handleSignOut(); setIsMenuOpen(false); }} 
            className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;