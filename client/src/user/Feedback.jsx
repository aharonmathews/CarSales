import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log({
      name,
      email,
      message
    });
    // Reset the form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>
      
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
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                    required
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
                    className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                    required
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
