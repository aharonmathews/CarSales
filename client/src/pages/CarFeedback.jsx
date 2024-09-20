import React, { useState } from 'react';

const CarFeedback = () => {
  const [feedback, setFeedback] = useState("");
  const [reviews, setReviews] = useState([
    { id: 1, user: "John Doe", review: "Great car, smooth ride!" },
    { id: 2, user: "Jane Smith", review: "Loved the interior design!" }
  ]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const newReview = { id: reviews.length + 1, user: "Anonymous", review: feedback };
    setReviews([...reviews, newReview]);
    setFeedback(""); // Clear input
  };

  return (
    <div className="feedback-container p-4">
      <h2 className="text-2xl font-bold mb-4">Car Feedback & Reviews</h2>
      
      {/* Feedback Form */}
      <form onSubmit={handleFeedbackSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Leave your feedback here"
          className="w-full p-2 border border-gray-300 rounded"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Submit Feedback
        </button>
      </form>

      {/* Display Reviews */}
      <div className="reviews mt-6">
        <h3 className="text-xl font-semibold mb-2">Customer Reviews</h3>
        {reviews.map((review) => (
          <div key={review.id} className="review bg-gray-100 p-3 rounded mb-2">
            <p className="text-sm font-semibold">{review.user}</p>
            <p>{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarFeedback;
