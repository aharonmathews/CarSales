import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate()
  const [search,setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${search}`);
  };
  return (
    <>
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
            onChange={(e)=>setSearch(e.target.value)}/>
        </form>
      </div>
      

      <div className='flex flex-row gap-7 items-center justify-center mr-10'>
        <a className='flex flex-row hover:cursor-pointer hover:text-zinc-600 border-b-2' onClick={()=> navigate("/wishlist")}>
          Wishlist
        </a>
        <p className=' border-b-2'>
          Location
        </p>
        <button className='border-2 border-gray-500 bg-slate-200 px-3 py-1 rounded-lg hover:bg-slate-300' onClick={() => navigate("/signIn")} target="_blank">
          Sign In
        </button> 
      </div>
    </div>
    </>
  )
}

export default Navbar