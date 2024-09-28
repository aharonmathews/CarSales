import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import React, { useState, useRef, useEffect } from "react";

const CarDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { img, title, text } = location.state || {};

  const [selectedTab, setSelectedTab] = useState("Overview");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [dealershipTitle, setDealershipTitle] = useState("Luxury Motors");
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const reviewSectionRef = useRef(null);

  useEffect(() => {
    if (dealershipTitle) {
      logProductView(dealershipTitle);
    }
  }, [dealershipTitle]);

  const handleHeartClick = (index) => {
    setRating(index + 1);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmitReview = () => {
    alert(`Review submitted: ${review}`);
  };

  const logProductView = (dealership) => {
    console.log(`Product viewed: ${dealership}`);
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
    navigate("/make-an-offer", { state: { img, title, text } });
  };

  const handleCompareClick = () => {
    navigate("/compare-cars", { state: { img, title, text } });
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

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleHeartIconClick = () => {
    setIsHeartClicked(!isHeartClicked);
    navigate("/wishList");
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="max-w-5xl w-full bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-4">
              <img
                src={img || "carPlaceholder.jpg"}
                alt={title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full lg:w-1/2 p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">{title || "Car"}</h2>
                <p className="text-xl text-green-600">₹{text || "Price not available"}</p>
              </div>
              <div className="flex items-center my-4 text-sm text-gray-500">
                <span className="font-medium">{dealershipTitle}</span>
                <svg
                  className="w-5 h-5 text-green-500 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="relative ml-2">
                  <button
                    aria-label="Verified Dealership Info"
                    className="text-gray-400 hover:text-gray-600"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M12 18h.01"
                      />
                    </svg>
                  </button>
                  {showTooltip && (
                    <div className="absolute left-0 mt-2 w-48 p-2 bg-white text-gray-700 text-sm border border-gray-200 rounded-lg shadow-lg">
                      This dealership is verified for authenticity and reliability.
                    </div>
                  )}
                </div>
                <svg
                  onClick={handleHeartIconClick}
                  aria-label={isHeartClicked ? "Remove from Wishlist" : "Add to Wishlist"}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-6 h-6 ml-2 cursor-pointer ${isHeartClicked ? "text-red-500" : "text-gray-400"}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              </div>
              <div className="flex space-x-2 mb-4">
                <button className="bg-black text-white px-4 py-2 rounded-md">
                  Check market value
                </button>
                <button
                  className="bg-black text-white px-4 py-2 rounded-md"
                  onClick={handleCompareClick}
                >
                  Compare
                </button>
                <button
                  className="bg-black text-white px-4 py-2 rounded-md"
                  onClick={handleMakeOfferClick}
                >
                  Make an Offer
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex space-x-4">
              {["Overview", "Specification", "Seller Info"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 text-sm rounded ${selectedTab === tab ? "bg-black text-white" : "bg-gray-200 text-black"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="mt-4">{renderTabContent()}</div>
          </div>
          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4">Rate and Review</h3>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  onClick={() => handleHeartClick(index)}
                  className={`w-8 h-8 cursor-pointer ${index < rating ? "text-yellow-500" : "text-gray-300"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927C9.432 2.036 10.568 2.036 10.95 2.927l1.286 2.707a1 1 0 00.756.545l2.992.435c.969.141 1.356 1.332.654 2.012l-2.165 2.11a1 1 0 00-.287.885l.511 2.975c.168.98-.86 1.723-1.746 1.263l-2.67-1.403a1 1 0 00-.932 0l-2.67 1.403c-.886.46-1.914-.283-1.746-1.263l.51-2.975a1 1 0 00-.287-.885L2.35 8.626c-.702-.68-.315-1.87.654-2.012l2.992-.435a1 1 0 00.756-.545l1.286-2.707z" />
                </svg>
              ))}
            </div>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              value={review}
              onChange={handleReviewChange}
              placeholder="Write your review..."
            />
            <button
              className="bg-black text-white px-4 py-2 mt-4 rounded-md"
              onClick={handleSubmitReview}
            >
              Submit Review
            </button>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              className="bg-black text-white px-6 py-2 rounded-md"
              onClick={handleScrollToReview}
            >
              Scroll to Review
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetails;
