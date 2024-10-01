import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Dpmenu from '../components/dropcars';
import Footer from '../components/Footer';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function CompareCars() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCar1, setSelectedCar1] = useState(""); // State for first car selection
  const [selectedCar2, setSelectedCar2] = useState(""); // State for second car selection
  const [cars, setCars] = useState([]); // State for storing car data from Firestore
  const parameters = [
    'Seating Capacity', 'Permit Valid Until', 'Extcolor', 
    'Cubic Capacity', 'Chassis Number', 'Mileage', 
    'Model', 'Manufacturer', 'Year', 'Overview', 
    'Engine', 'Engine Number', 'Tyre Size', 'Weight', 
    'Insurancevalidity', 'Fuel', 'Insurance Company Name', 
    'PUCC Valid Until', 'Transmission', 'Body Type'
  ]; // Static parameters

  useEffect(() => {
    const fetchCars = async () => {
      const db = getFirestore();
      const carCollection = collection(db, 'Cardatabase');
      const carDocs = await getDocs(carCollection);
      const carData = [];

      carDocs.forEach((doc) => {
        const data = doc.data();
        // Assuming each document contains car details as fields
        Object.keys(data).forEach(carName => {
          carData.push({ name: carName, ...data[carName] }); // Push car data into the array
        });
      });

      setCars(carData); // Set state with car data from Firestore
    };

    fetchCars();
  }, []);

  // Function to format timestamps
  const formatTimestamp = (timestamp) => {
    if (timestamp && typeof timestamp === 'object' && 'seconds' in timestamp) {
      const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
      return date.toLocaleDateString(); // Format as a date string
    }
    return timestamp; // Return the original value if not a timestamp
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="page mt-10 mx-32 text-center">
          <div className="text-5xl font-bold my-10">Compare cars</div>
          <div className="mt-8 text-2xl">
            Find the perfect car with our easy-to-use comparison tool! ...
          </div>
        </div>

        <table className="Tb max-w-5xl mx-auto my-16 text-lg border-2 border-black">
          <tbody>
            <tr>
              <th className="item p-3 border">Name</th>
              <th className="item p-3 border ">
                <div className='flex justify-center items-start h-24'>
                  <Dpmenu onCarSelect={setSelectedCar1} cars={cars} /> {/* Pass car data */}
                </div>
                <div className="flex justify-center items-center">
                  {selectedCar1 && <img src={cars.find(car => car.name === selectedCar1)?.img} className="c-img w-72 max-h-96 mt-5 object-cover border-2 border-gray-300" alt={selectedCar1} />}
                </div>
              </th>
              <th className="item p-3 border">
                <div className='flex justify-center items-start h-24'>
                  <Dpmenu onCarSelect={setSelectedCar2} cars={cars} /> {/* Pass car data */}
                </div>
                <div className="flex justify-center items-center">
                  {selectedCar2 && <img src={cars.find(car => car.name === selectedCar2)?.img} className="c-img w-72 max-h-96 mt-5 object-cover border-2 border-gray-300" alt={selectedCar2} />}
                </div>
              </th>
            </tr>
            {parameters.map((param, index) => (
              <tr key={index}>
                <td className="item p-3 border">{param}</td>
                <td className="item p-3 border">{formatTimestamp(cars.find(car => car.name === selectedCar1)?.[param])}</td>
                <td className="item p-3 border">{formatTimestamp(cars.find(car => car.name === selectedCar2)?.[param])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}

export default CompareCars;
