import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

const locations = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
  'Pune', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Nagpur'
  // Add more locations as needed
];

const LocationMenu = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(''); // Default to an empty string
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserLocation = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = doc(db, 'userInfo', user.email);
        const userSnapshot = await getDoc(userDoc);
        
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setSelectedLocation(userData.location || 'Location🌐'); // Fallback to default if location not found
        }
      }
    };

    fetchUserLocation();
  }, [auth, db]);

  const handleLocationClick = async (location) => {
    setSelectedLocation(location); // Update the button label with the selected location
    setShowDropdown(false); // Close the dropdown

    // Update Firestore with the new location
    const user = auth.currentUser;
    if (user) {
      const userDoc = doc(db, 'userInfo', user.email);
      try {
        await updateDoc(userDoc, { location }); // Update the location field in Firestore
        console.log('Location updated successfully:', location);
      } catch (error) {
        console.error('Error updating location:', error);
      }
    }
  };

  return (
    <div className="relative inline-block text-left">
      {/* Button to open the dropdown */}
      <button
        type="button"
        className="e1 text-black border-b-2 hover:border-b-black hover:cursor-pointerr"
        onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility
      >
        {selectedLocation ? `${selectedLocation} 📍` : 'Location🌐'} {/* Display selected location with 📍 */}
      </button>

      {/* Dropdown menu */}
      {showDropdown && (
        <div className="absolute mt-5 mr-3 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1 max-h-60 overflow-y-auto">
            {locations.map((location, index) => (
              <div
                key={index}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleLocationClick(location)}
              >
                {location}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMenu;
