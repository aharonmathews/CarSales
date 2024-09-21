import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import pic1 from '../assets/carInterior.jpg';
import plchldr from "../assets/CarPlaceholdr.jpg";
import pic2 from "../assets/carSMbg.jpeg";
import Card1 from "../components/Card1";

const data = [
  {
    img: plchldr,
    title: "Car 1",
    text: "Cost",
  },
  {
    img: plchldr,
    title: "Car 2",
    text: "Cost",
  },
  {
    img: plchldr,
    title: "Car 3",
    text: "Cost",
  },
  {
    img: plchldr,
    title: "Car 4",
    text: "Cost",
  },
];

const UserHome = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
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
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${search}`);
  };

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
                className='w-[30rem] p-3 flex border-2 my-4 lg:my-8 ml-5 px-3 py-1 rounded-lg text-xl' placeholder='Find your car!'
                onChange={(e) => setSearch(e.target.value)} />
            </form>
          </div>
        </div>
      </div>

      <div className='block md:hidden'>{/* Mobile view */}
        <img src={pic2} className='absolute h-[16rem] w-full' />
        <div className='relative z-10 p-12 lg:p-16'>
          <p className='text-slate-200 font-semibold text-8xl text-border '>Car?</p>
          <form onSubmit={handleSearch} className='flex flex-row items-center'>
            <input
              type="text"
              id="search"
              className='w-[30rem] p-3 flex border-2 my-4 lg:my-8 ml-5 px-3 py-1 rounded-lg text-xl' placeholder='Find your car!'
              onChange={(e) => setSearch(e.target.value)} />
          </form>
        </div>
      </div>

      <div className='text-4xl font-semibold md:mt-24 mx-16'>
        Trending Searches
      </div>
      <div className='grid md:grid-cols-4 mx-10 mt-8 px-10 justify-items-center mb-20'>
        {data.map((item, index) => (
          <div key={index}>
            <Card1 img={item.img} text={item.text} title={item.title} />
          </div>
        ))}
      </div>
    </>
  );
};

export default UserHome;