import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CarDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { img, title, text } = location.state || {};

  const [selectedTab, setSelectedTab] = useState("Overview");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  // Ref for the review section
  const reviewSectionRef = useRef(null);

  // Dummy data for "You might be interested in"
  const suggestedCars = [
    {
      img: "https://imgd.aeplcdn.com/600x337/n/cw/ec/153319/range-rover-velar-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80",
      title: "Car 1",
      text: "₹10,000",
    },
    {
      img: "https://imgd.aeplcdn.com/600x337/n/cw/ec/153319/range-rover-velar-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80",
      title: "Car 2",
      text: "₹15,000",
    },
    {
      img: "https://imgd.aeplcdn.com/600x337/n/cw/ec/153319/range-rover-velar-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80",
      title: "Car 3",
      text: "₹12,000",
    },
  ];

  const handleHeartClick = (index) => {
    setRating(index + 1);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmitReview = () => {
    alert(`Review submitted: ${review}`);
  };

  const handleScrollToReview = () => {
    if (reviewSectionRef.current) {
      reviewSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSuggestedCarClick = (car) => {
    navigate(`/car-details`, { state: { img: car.img, title: car.title, text: car.text } });
  };

  const handleMakeOfferClick = () => {
    // Navigate to MakeAnOffer page and pass the current car's details
    navigate('/make-an-offer', { state: { img, title, text } });
  };

  const handleCompareClick = () => {
    // Navigate to CompareCars page with the current car details
    navigate('/compare-cars', { state: { img, title, text } });
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Overview":
        return <div className="p-4">Car overview content here...</div>;
      case "Specification":
        return <div className="p-4">Car specifications here...</div>;
      case "Seller Info":
        return <div className="p-4">Seller information here...</div>;
      default:
        return null;
    }
  };

  return (
    <>
    <Navbar />
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-md p-6">
        {/* Header and Image Section */}
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-4">
            <img
              src={img || "carPlaceholder.jpg"}
              alt={title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">{title || "Car"}</h2>
              <p className="text-xl text-green-600">₹{text || "Price not available"}</p>
            </div>
            <div className="my-4 text-sm text-gray-500">Verified</div>
            <div className="flex space-x-2 mb-4">
              <button className="bg-black text-white px-4 py-2 rounded-md">
                Check market value
              </button>
              <button
                className="bg-black text-white px-4 py-2 rounded-md"
                onClick={handleCompareClick} // Navigate to CompareCars page
              >
                Compare
              </button>
              <button
                className="bg-black text-white px-4 py-2 rounded-md"
                onClick={handleMakeOfferClick} // Navigate to MakeAnOffer page
              >
                Make an Offer
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-6">
          <div className="flex space-x-4">
            {["Overview", "Specification", "Seller Info"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 text-sm rounded ${
                  selectedTab === tab
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-4">{renderTabContent()}</div>
        </div>

        {/* Rating and Review Section */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4">Rate and Review</h3>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                onClick={() => handleHeartClick(index)}
                className={`w-8 h-8 cursor-pointer ${index < rating ? "text-red-500" : "text-gray-300"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ))}
          </div>
          <textarea
            ref={reviewSectionRef}
            value={review}
            onChange={handleReviewChange}
            className="w-full h-32 p-2 border rounded-md"
            placeholder="Leave your review here..."
          />
          <button
            onClick={handleSubmitReview}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit Review
          </button>
        </div>

        {/* Scroll to Review Button */}
        <button
          onClick={handleScrollToReview}
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md"
        >
          Scroll to Review
        </button>

        {/* "You Might Be Interested In" Section */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4">You might be interested in</h3>
          <div className="flex gap-6 overflow-x-auto py-4">
            {suggestedCars.map((car, index) => (
              <div
                key={index}
                className="w-[15rem] min-h-[18rem] border-2 border-black rounded-xl hover:cursor-pointer hover:shadow-lg hover:scale-105 transform duration-200"
                onClick={() => handleSuggestedCarClick(car)}
              >
                <img
                  src={car.img}
                  alt={car.title}
                  className="rounded-t-xl shadow-lg object-cover w-full h-40"
                />
                <div className="p-2">
                  <h4 className="font-semibold text-md">{car.title}</h4>
                  <p className="text-gray-600">{car.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default CarDetails;
