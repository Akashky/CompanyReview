import { useState } from 'react';
import { addReview } from '../utils/api';

const ReviewModal = ({ onClose, reviews, companyId }) => {
    const [reviewData, setReviewData] = useState({
        fullName: '',
        subject: '',
        reviewText: '',
        rating: ''
    });
    const [allReviews, setAllReviews] = useState(reviews || []);

    const handleChange = (e) => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addReview(companyId, reviewData);
            setAllReviews([...allReviews, response.review]);
            alert('Review added successfully');
        } catch (error) {
            console.error('Error adding review:', error);
            alert('Failed to add review');
        }
        onClose();
    };
    
    return (
        <div className="add-company-modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>
                    &times;
                </span>
                <h2>Add Company</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullname">Full Name<span style={{ color: "red" }}>*</span></label>
                        <input
                            type="text"
                            name="fullName"
                            value={reviewData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subjext">Subject<span style={{ color: "red" }}>*</span></label>
                        <input
                            type="text"
                            name="subject"
                            value={reviewData.subject}
                            onChange={handleChange}
                            required
                        />
                        <span className="location-icon">
                            <i className="fas fa-map-marker-alt"></i>
                        </span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="review-test">Review Text<span style={{ color: "red" }}>*</span></label>
                        <textarea
                            style={{ width: "100%", height: "60px", border: "1px solid #ccc" }}
                            name="reviewText"
                            value={reviewData.reviewText}
                            onChange={handleChange}
                            required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Rating<span style={{ color: "red" }}>*</span></label>
                        <input
                            name="rating"
                            type="number"
                            value={reviewData.rating}
                            onChange={handleChange}
                            required />
                    </div>
                    <button type="submit" className="save-button">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;