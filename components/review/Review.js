import React from 'react';

const Review = ({review}) => {
    return (
        <div  className="review-card my-3">
            <div className="rating-outer">
                <div
                    className="rating-inner"
                    style={{width: `${(review.rating) / 5 * 100}%`}}
                />
            </div>
            <p className="review_user">{review.name}</p>
            <p className="review_comment">{review.comment}</p>
            <hr/>
        </div>
    );
};

export default Review;
