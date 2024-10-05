import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from './Navbar';

const CarDetails = () => {
  const { id: carID } = useParams(); // Get carID from URL params
  const [carData, setCarData] = useState(null);
  const [carOverview, setCarOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // To enable/disable edit mode
  const navigate = useNavigate();
  const db = getFirestore();
  const storage = getStorage();

  // Fetch both car details from 'carDetails' and car overview from 'cars'
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        if (!carID) {
          throw new Error('carID is undefined');
        }

        const carDetailsRef = doc(db, 'carDetails', carID);
        const carOverviewRef = doc(db, 'carDetails', carID);

        const carDetailsDoc = await getDoc(carDetailsRef);
        const carOverviewDoc = await getDoc(carOverviewRef);

        if (carDetailsDoc.exists()) {
          setCarData(carDetailsDoc.data());
        } else {
          console.error('No carDetails document found!');
        }

        if (carOverviewDoc.exists()) {
          setCarOverview(carOverviewDoc.data());
        } else {
          console.error('No cars document found!');
        }
      } catch (error) {
        console.error('Error fetching car data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [carID, db]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageRef = ref(storage, `carDetails/${carID}/thumbnail_${file.name}`);
      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);
      setCarData((prevData) => ({
        ...prevData,
        thumbnailImg: imageUrl,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const carDetailsRef = doc(db, 'carDetails', carID);
      const carsRef = doc(db, 'carDetails', carID);

      await updateDoc(carDetailsRef, carData);
      await updateDoc(carsRef, {
        carName: carData.carName,
        carPrice: carData.carPrice,
        carFuel: carData.carFuel,
        thumbnailImg: carData.thumbnailImg,
        hidden: carData.hidden,
      });

      alert('Car details updated successfully!');
      setIsEditing(false);
      navigate('/dealership/dashboard');
    } catch (error) {
      console.error('Error updating car details:', error);
      alert('Error updating car details. Please try again.');
    }
  };

  const handleHideCar = async () => {
    try {
      const carsRef = doc(db, 'carsDetails', carID);
      await updateDoc(carsRef, { hidden: true });
      setCarOverview((prevOverview) => ({ ...prevOverview, hidden: true }));
    } catch (error) {
      console.error('Error hiding car:', error);
    }
  };

  const handleUnhideCar = async () => {
    try {
      const carsRef = doc(db, 'carDetails', carID);
      await updateDoc(carsRef, { hidden: false });
      setCarOverview((prevOverview) => ({ ...prevOverview, hidden: false }));
    } catch (error) {
      console.error('Error unhiding car:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!carData || !carOverview) {
    return <div>No car data found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Navbar />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold">Car Details</h2>
        <div>
          <button
            className="border-2 rounded-lg text-white bg-yellow-500 hover:bg-yellow-700 p-2 mr-2"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          {carOverview.hidden ? (
            <button
              className="border-2 rounded-lg text-white bg-green-500 hover:bg-green-700 p-2"
              onClick={handleUnhideCar}
            >
              Unhide Car
            </button>
          ) : (
            <button
              className="border-2 rounded-lg text-white bg-red-500 hover:bg-red-700 p-2"
              onClick={handleHideCar}
            >
              Hide Car
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg">
        {/* Display fields like name, price, fuel type, etc */}
        <label className="mb-2 font-semibold">Car Name</label>
        <input
          className="border-2 border-gray-300 mb-4 p-2 rounded-lg"
          name="carName"
          value={carData.carName || ''}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
        {/* More fields can be added similarly */}
        
        <label className="mb-2 font-semibold">Thumbnail Image</label>
        <input
          className="border-2 border-gray-300 mb-4 p-2 rounded-lg"
          type="file"
          onChange={handleImageChange}
          disabled={!isEditing}
        />
        {carData.thumbnailImg && (
          <img
            src={carData.thumbnailImg}
            alt="Thumbnail"
            className="w-24 h-24 object-cover mb-4"
          />
        )}

        <button
          className="border-2 rounded-lg text-white bg-blue-500 hover:bg-blue-700 p-4"
          onClick={handleSave}
          disabled={!isEditing}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CarDetails;
