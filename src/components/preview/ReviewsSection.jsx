// preview/ReviewsSection.jsx
import React, { useState } from 'react';

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [input, setInput] = useState('');

  const submitReview = () => {
    if (input.trim()) {
      setReviews([...reviews, input]);
      setInput('');
    }
  };

  return (
    <div className="reviews">
      <h3>Reviews</h3>
      <input
        type="text"
        placeholder="Write a quick review..."
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <button onClick={submitReview}>Submit</button>
      <ul>
        {reviews.map((rev, idx) => (
          <li key={idx}>"{rev}"</li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsSection;