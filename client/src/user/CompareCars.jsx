import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Dpmenu from '../components/dropcars';
import Footer from '../components/Footer';

function App() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCar1, setSelectedCar1] = useState(""); // State for first car selection
  const [selectedCar2, setSelectedCar2] = useState(""); // State for second car selection
  
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${search}`);
  };

  const parameters = [
    'Sold By', 'Model', 'Year', 'External Color',
    'Fuel', 'Transmission', 'Mileage', 'Additional Features'
  ];

  const cars = [
    { name: 'Maruti 800', 
      img: 'https://img.indianautosblog.com/2021/03/05/maruti-800-ss80-restored-front-3-quarters-fbed.jpg',
      seller: 'Maruti seller', 
      model: 'Hatchback', 
      year: '2010', 
      color: 'Red',
      fuel: 'Petrol',
      gear: 'Manual',
      mileage: '10km/L',
      features: 'Basic features' },

    { name: 'Honda City',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVl8ZMGp4zJW58wm-9WLUrUEfdSLySPTJ_nw&s',
      seller: 'Honda dealer',
      model: 'Sedan',
      year: '2018',
      color: 'White',
      fuel: 'Diesel',
      gear: 'Automatic',
      mileage: '15km/L',
      features: 'Sunroof, ABS' },

    { name: 'Toyota Corolla',
      img: 'https://www.carandbike.com/_next/image?url=https%3A%2F%2Fimages.carandbike.com%2Fcar-images%2Fbig%2Ftoyota%2Fcorolla%2Ftoyota-corolla.jpg%3Fv%3D5&w=640&q=75',
      seller: 'Toyota dealer',
      model: 'Sedan',
      year: '2020',
      color: 'white',
      fuel: 'Hybrid',
      gear: 'Automatic',
      mileage: '20km/L',
      features: 'Keyless entry, Adaptive cruise control' },

    { name: 'Ford Mustang',
      img: 'https://imgd.aeplcdn.com/1280x720/cw/ec/23766/Ford-Mustang-Exterior-126883.jpg?wm=0&q=80',
      seller: 'Ford dealer',
      model: 'Coupe',
      year: '2019',
      color: 'Blue',
      fuel: 'Petrol',
      gear: 'Manual',
      mileage: '8km/L',
      features: 'V8 engine, Leather seats, Rear camera' },

    { name: 'Tesla Model 3',
      img: 'https://imgd.aeplcdn.com/600x337/n/lnk9cva_1595893.jpg?q=80',
      seller: 'Tesla showroom',
      model: 'Sedan',
      year: '2021',
      color: 'Black',
      fuel: 'Electric',
      gear: 'Automatic',
      mileage: '500km (Full charge)',
      features: 'Autopilot, Touchscreen dashboard, Full Self-Driving' }
  ];

  return (
    <>
      <div>
        <Navbar />
        <div className="page mt-10 mx-32 text-center">
          <div className="text-5xl font-bold my-10">Compare cars</div>
          <div className="mt-8 text-2xl">
            Find the perfect car with our easy-to-use comparison tool! Whether you're looking for a fuel-efficient sedan, a powerful SUV, or a sleek sports car, our platform allows you to compare the latest models side by side. Explore key features like price, performance, safety ratings, and more, helping you make an informed decision. Start comparing today and drive away with confidence!
          </div>
        </div>

        <table className="Tb max-w-5xl mx-auto my-16 text-lg border-2 border-black">
          <tbody>
            <tr>
              <th className="item p-3 border">Name</th>
              <th className="item p-3 border ">
                <div className='flex justify-center items-start h-24'>
                  <Dpmenu onCarSelect={setSelectedCar1} /> {/* Pass handler for first car */}
                </div>
                <div className="flex justify-center items-center">
                  {selectedCar1 && <img src={cars.find(car => car.name === selectedCar1)?.img} className="c-img w-72 max-h-96 mt-5 object-cover border-2 border-gray-300" alt={selectedCar1} />}
                </div>
              </th>
              <th className="item p-3 border">
                <div className='flex justify-center items-start h-24' >
                  <Dpmenu onCarSelect={setSelectedCar2} /> {/* Pass handler for second car */}
                </div>
                <div className="flex justify-center items-center">
                  {selectedCar2 && <img src={cars.find(car => car.name === selectedCar2)?.img} className="c-img w-72 max-h-96 mt-5 object-cover border-2 border-gray-300" alt={selectedCar2} />}
                </div>
              </th>
            </tr>
            {parameters.map((param, index) => (
              <tr key={index}>
                <td className="item p-3 border">{param}</td>
                <td className="item p-3 border">{cars.find(car => car.name === selectedCar1)?.[Object.keys(cars[0])[index + 2]]}</td>
                <td className="item p-3 border">{cars.find(car => car.name === selectedCar2)?.[Object.keys(cars[0])[index + 2]]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  );
}

export default App;
