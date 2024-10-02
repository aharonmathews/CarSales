import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    // Check user authentication and fetch user data from Firestore
    const checkUser = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setEmail(user.email);  // Prefill email from Firebase Authentication

          // Fetch user data from Firestore
          const userDoc = doc(db, 'userInfo', user.email);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setName(userData.name || '');
          }

          // If both name and email are present, make fields uneditable
          if (user.email && userSnapshot.exists() && userSnapshot.data().name) {
            setIsEditable(false);
          }
          setLoading(false);
        } else {
          // If no user is authenticated, keep the fields editable
          setIsEditable(true);
          setLoading(false);
        }
      });
    };

    checkUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const db = getFirestore();
    const docRef = doc(db, `Reviews/${name}_${email}`);

    const timestamp = new Date().toISOString(); // Generate a unique timestamp

    try {
      await updateDoc(docRef, {
        [timestamp]: message, // Use the timestamp as the field name for the review
      });

      console.log('Review added successfully');
    } catch (error) {
      console.error('Error adding review:', error);
    }

    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
        <div className="container mx-auto p-10 max-w-lg bg-slate-100 shadow-lg mt-10 mb-10">
          <h1 className="text-3xl font-semibold mb-6">We Value Your Feedback!</h1>
          
          {submitted ? (
            <div className="bg-green-100 text-green-700 p-4 rounded-md mb-6">
              Thank you for your feedback!
            </div>
          ) : (
            <>
              <p className="mb-6">Please let us know what you think about our service.</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 ${!isEditable ? 'text-gray-400 bg-gray-100' : ''}`}
                    readOnly={!isEditable}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 ${!isEditable ? 'text-gray-400 bg-gray-100' : ''}`}
                    readOnly={!isEditable}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">
                    Feedback Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                    rows="4"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Submit Feedback
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

export default Feedback;
