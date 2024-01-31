import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  const starElements = [];

  for (let i = 0; i < fullStars; i++) {
    starElements.push(<FaStar key={i} />);
  }
  
  if (hasHalfStar) {
    starElements.push(<FaStarHalfAlt key="half-star" />);
  }
  
  const totalStars = 5;
  const remainingStars = totalStars - starElements.length;
  for (let i = 0; i < remainingStars; i++) {
    starElements.push(<FaRegStar key={`empty-star-${i}`} />);
  }
  
  return (
    <div>
      {starElements}
    </div>
  );
};

export default StarRating;
