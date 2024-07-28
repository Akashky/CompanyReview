import { useEffect, useState } from 'react';
import { fetchReviews } from '../utils/api';

const renderStars = (rating) => {
  let stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<i key={i} className="fa-solid fa-star" style={{color:"#f44336"}}></i>);
  }
  return stars;
};

const ReviewSection = ({ companyId, reviews }) => {
  const [allReviews, setAllReviews] = useState(reviews || []);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchReviews(companyId);
        setAllReviews(data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    getReviews();
  }, [companyId, reviews]);

  return (
    <>
        {allReviews.map((review) => (
          <div className='reviews' key={review._id}>
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
            <h4>{review.fullName}</h4>
            <h6>{review.subject}</h6>
            <p>{review.reviewText}</p>
            <p>Rating: {renderStars(review.rating)}</p>
          </div>
        ))}
    </>
  );
};

export default ReviewSection;
