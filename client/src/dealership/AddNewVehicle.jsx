import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UpdateCarDatabase = () => {
  const [dealerName, setDealerName] = useState('');  // Dealer name
  const [carModel, setCarModel] = useState('');      // Car model field
  const [carPrice, setCarPrice] = useState('');      // Car price field
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    // Check user authentication and fetch dealer name
    const checkUser = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Fetch dealer name from Firestore (assuming stored under user's email)
          const userDoc = doc(db, 'userInfo', user.email);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setDealerName(userData.name || '');
          }

          setLoading(false);
        } else {
          setLoading(false);
          navigate('/');  // Redirect if no user is found
        }
      });
    };

    checkUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const db = getFirestore();

    // Path: Cardatabase/DealerName/CarModel: carPrice
    const carDoc = doc(db, `Cardatabase/${dealerName}`);

    try {
      await setDoc(carDoc, {
        [carModel]: carPrice  // Add/update car model with price
      }, { merge: true });

      console.log('Car data added/updated successfully');
    } catch (error) {
      console.error('Error updating car database:', error);
    }

    // Reset form fields
    setCarModel('');
    setCarPrice('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
        <div className="container mx-auto p-10 max-w-lg bg-slate-100 shadow-lg mt-10 mb-10">
          <h1 className="text-3xl font-semibold mb-6">Update Car Database</h1>
          
          {submitted ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-md mb-6">
              Car database updated successfully!
            </div>
          ) : (
            <>
              <p className="mb-6">Add or update your car information.</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="dealerName">
                    Dealer Name
                  </label>
                  <input
                    type="text"
                    id="dealerName"
                    value={dealerName}
                    onChange={(e) => setDealerName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                    readOnly // Dealer name is prefilled and uneditable
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="carModel">
                    Car Model
                  </label>
                  <input
                    type="text"
                    id="carModel"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="carPrice">
                    Car Price
                  </label>
                  <input
                    type="number"
                    id="carPrice"
                    value={carPrice}
                    onChange={(e) => setCarPrice(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Update Car Database
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UpdateCarDatabase;
