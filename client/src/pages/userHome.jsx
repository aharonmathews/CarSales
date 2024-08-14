import Navbar from '../components/Navbar';
import pic1 from '../assets/carInterior.jpg';
import plchldr from "../assets/CarPlaceholdr.jpg";
import Card1 from "./Card1";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const data=[
  {
    img:plchldr,
    title:"Car 1",
    text:"Cost",
  },
  {
    img:plchldr,
    title:"Car 1",
    text:"Cost",
  },
  {
    img:plchldr,
    title:"Car 1",
    text:"Cost",
  },
  {
    img:plchldr,
    title:"Car 1",
    text:"Cost",
  },

]

const UserHome = () => {
  const [search,setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${search}`);
  };

  return (
    <>
    <Navbar />
      <div className="relative m-10">
        <div
          className='bg-cover bg-center lg:w-[90rem] lg:h-[25rem] sm:w-[45rem] sm:h-[20rem] absolute -z-1 rounded-3xl'
          style={{ backgroundImage: `url(${pic1})` }}
        />
        <div className='relative z-10 p-12 lg:p-16'>
          <p className='text-slate-200 font-semibold text-8xl'>Car?</p>
          <form onSubmit={handleSearch} className='flex flex-row items-center'>
            <input 
              type="text" 
              id="search" 
              className='w-[30rem] p-3 flex border-2 my-4 lg:my-8 ml-5 px-3 py-1 rounded-lg text-xl' placeholder='Find your car!' 
              onChange={(e)=> setSearch(e.target.value)}/>
            <button 
              className='bg-white hover:bg-zinc-300 h-10 w-10 p-1 mx-4 rounded-2xl text-lg text-semibold'
              type='submit'
            >
              <img src={'https://img.icons8.com/?size=100&id=11686&format=png&color=000000'} className='w-fit'/>
            </button>
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
  )
}

export default UserHome