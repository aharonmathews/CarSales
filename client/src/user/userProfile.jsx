import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
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
        }
        setLoading(false);
      } else {
        setLoading(false);
        navigate("/");
      }
    });

    const handleBeforeUnload = (event) => {
      if (isEditing) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isEditing, navigate]);

  const handleSave = async () => {
    if (!userEmail) return;

    if (phone.length !== 10) {
      setError('Phone number must have exactly 10 digits.');
      return;
    }

    const db = getFirestore();
    const userDoc = doc(db, 'userInfo', userEmail);

    await setDoc(userDoc, {
      name,
      phone,
      location,
      isProfileCompleted: 'yes'
    }, { merge: true });

    alert('Profile updated successfully!');
    setIsEditing(false);
    navigate('/');

  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
      setError(''); // Clear error when valid input is entered
    } else {
      setError('Phone number must have exactly 10 digits.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Profile</h2>
        {!isEditing && (
          <button 
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
      {error && (
        <div className="mb-4 p-2 bg-red-200 text-red-800 border border-red-400 rounded">
          {error}
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          disabled={!isEditing}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone Number</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          value={phone} 
          onChange={handlePhoneChange} 
          disabled={!isEditing}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Location</label>
        <select 
          className="w-full p-2 border rounded" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)}
          disabled={!isEditing}
        >
          <option value="">Select a district</option>
          {districtsOfKerala.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>
      {isEditing && (
        <button 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700" 
          onClick={handleSave}
        >
          Save Changes
        </button>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default Profile;