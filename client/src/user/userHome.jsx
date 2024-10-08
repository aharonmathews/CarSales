import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import pic1 from '../assets/carInterior.jpg';
import plchldr from "../assets/CarPlaceholdr.jpg";
import Help from "../components/chatbothelp";
import Footer from '../components/Footer';
import loadingGif from '../assets/Loadingcar.gif'; // Import your loading GIF

const UserHome = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    // Check user authentication and profile completion
    const checkUser = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUser(user);
          const userDoc = doc(db, 'userInfo', user.email);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            if (userData.isProfileCompleted === 'no') {
              navigate('/profile');
            }
          }
        }
        setLoading(false);
      });
    };

    // Fetch car data
    const fetchCarsData = async () => {
      const carCollection = collection(db, 'vehicles');
      try {
        const carSnapshot = await getDocs(carCollection);
        const carList = carSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCarsData(carList);
      } catch (error) {
        console.error("Error fetching car data:", error);
        setError("Failed to load car data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
    fetchCarsData();
  }, [navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${search}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img src={loadingGif} className="w-32 h-32" /> {/* Display loading GIF */}
      </div>
    );
  }

  if (error) return <div className="error-message">{error}</div>;

  return (
    <>
    <div className="bg-[#efefff] pb-10">
      <div className='hidden md:block'>
        <Help />
        <Navbar />
        <div className="relative m-10">
          <div
            className='bg-cover bg-center lg:w-[90rem] lg:h-[25rem] sm:w-[45rem] sm:h-[20rem] absolute -z-1 rounded-3xl'
            style={{ backgroundImage: `url(${pic1})` }}
          />
          <div className='relative z-10 p-12 lg:p-16'>
            <p className='text-slate-200 font-semibold text-8xl text-border'>Car?</p>
            <form onSubmit={handleSearch} className='flex flex-row items-center'>
              <input
                type="text"
                id="search"
                className='w-[30rem] p-3 flex border-2 my-4 lg:my-8 ml-5 px-3 py-1 rounded-lg text-xl' 
                placeholder='Find your car!'
                onChange={(e) => setSearch(e.target.value)} 
              />
            </form>
          </div>
        </div>
      </div>
      <div className='text-4xl font-semibold md:mt-24 mx-16'>
        All Cars
      </div>
      <div className='grid md:grid-cols-3 gap-4 mt-4 mx-10'>
        {carsData.map(car => (
          <div key={car.id} className="car-card border p-4 rounded-lg shadow-lg">
            <img src={car.images?.[0] || plchldr} alt={car.name} className="car-image mb-2 w-full h-48 object-cover rounded" />
            <h2 className="text-2xl font-semibold mt-2">{car.name || "name not available"}</h2>
            <p><strong>Price:</strong> ₹{car.price || "price not available"}</p>
            <button
              className="mt-2 text-blue-600"
              onClick={() => navigate(`/carDetails/${car.id}`)} // Navigate to detailed view
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      </div>
      <Footer />
    </>
  );
};

export default UserHome;