import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [isDealership, setIsDealership] = useState(null);
  const navigate = useNavigate();

  const districtsOfKerala = [
    'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam', 
    'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta', 
    'Thiruvananthapuram', 'Thrissur', 'Wayanad'
  ];

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);
        const userDoc = doc(db, 'userInfo', user.email);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setName(userData.name || '');
          setPhone(userData.phone || '');
          setLocation(userData.location || '');
          setIsDealership(userData.isDealership || 'no');
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  const handleSave = async () => {
    if (!userEmail) return;

    const db = getFirestore();
    const userDoc = doc(db, 'userInfo', userEmail);

    await setDoc(userDoc, {
      name,
      phone,
      location,
      isProfileCompleted: 'yes'
    }, { merge: true });

    alert('Profile updated successfully!');

    if (isDealership === 'no') {
      navigate('/');
    } else {
      navigate('/dealershipdashboard');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone Number</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Location</label>
        <select 
          className="w-full p-2 border rounded" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Select a district</option>
          {districtsOfKerala.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>
      <button 
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700" 
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default Profile;