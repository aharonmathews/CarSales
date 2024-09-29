import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import pic1 from '../assets/carInterior.jpg';
import pic2 from '../assets/carSMbg.jpeg';

const UserHome = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    const fetchCarsData = async () => {
      const db = getFirestore();
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

    fetchCarsData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${search}`);
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (carsData.length === 0) return <div>No car data found.</div>;

  return (
    <>
      <div className='hidden md:block'>
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

      <div className='block md:hidden'>
        <img src={pic2} className='absolute h-[16rem] w-full' />
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
      
      <div className='text-4xl font-semibold md:mt-24 mx-16'>
        All Cars
      </div>
      <div className='grid md:grid-cols-3 gap-4 mt-4 mx-10'>
        {carsData.map(car => (
          <div key={car.id} className="car-card border p-4 rounded-lg shadow-lg">
            <img src={car.images?.[0] || '/path/to/placeholder.jpg'} alt={car.name} className="car-image mb-2 w-full h-48 object-cover rounded" />
            <h2 className="text-2xl font-semibold mt-2">{car.name}</h2>
            <p><strong>ID:</strong> {car.id}</p>
            <p><strong>Price:</strong> ₹{car.price}</p>
            <p><strong>Trackerid:</strong>{car.trackerid}</p>
            <button
              className="mt-2 text-blue-600"
              onClick={() => navigate(`/car-details/${car.id}`)} // Navigate to detailed view
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserHome;
