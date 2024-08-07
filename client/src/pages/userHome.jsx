import Navbar from '../components/Navbar';
import pic1 from '../assets/carInterior.jpg';


const UserHome = () => {
  return (
    <>
    <Navbar />
    <div className="relative m-10">
        <div
          className='bg-cover bg-center lg:w-[90rem] lg:h-[25rem] absolute -z-1 rounded-3xl'
          style={{ backgroundImage: `url(${pic1})` }}
        />
        <div className='relative z-10 p-5'>
          <p className='text-slate-200 font-semibold text-8xl'>Car?</p>
          <form>
            <input type="text" id="search" className='w-[30rem] p-3 flex border-2  m-5 px-3 py-1 rounded-lg text-xl' placeholder='Find your car!'/>
          </form>
        </div>
      </div>
    </>
  )
}

export default UserHome