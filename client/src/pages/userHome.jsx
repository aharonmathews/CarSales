import { Navigate, useNavigate } from "react-router-dom";


import Navbar from '../components/Navbar';
import pic1 from '../assets/carInterior.jpg';
import plchldr from "../assets/CarPlaceholdr.jpg";
import Card1 from "../components/Card1";


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
          <form>
            <input type="text" id="search" className='w-[30rem] p-3 flex border-2 my-4 lg:my-8 mx-5 px-3 py-1 rounded-lg text-xl' placeholder='Find your car!'/>
          </form>
          <button className='shadow-sm border-1 bg-slate-100 hover:bg-zinc-300 px-3 py-1 ml-3 rounded-xl text-lg text-semibold'>Search</button>
        </div>
      </div>

      <div className='grid md:grid-cols-4 mx-10 mt-20 px-10 justify-items-center mb-20'>
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