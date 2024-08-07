import React from 'react';
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className='flex flex-row min-h-16 border-b-2 border-black justify-between'> {/* navbar */}
      <div className='flex flex-row'>
        <div className='flex flex-row items-center ml-3 mr-8'>Logo</div>
        <form>
          <input type="text" id="search" className='max-w-[40rem] min-w-[25rem] p-1 flex border-2  m-5 px-3 py-1 rounded-lg' placeholder='Search'/>
        </form>
      </div>
      

      <div className='flex flex-row gap-7 items-center justify-center mr-10'>
        <a className='flex flex-row'>
          Wishlist
        </a>
        <p>
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