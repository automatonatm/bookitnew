import React from 'react';
import Review from "./Review";


const ListReviews = ({reviews}) => {
    return (
        <div className="reviews w-75">
            <h3>Reviews:</h3>
            <hr/>

            {
                reviews && reviews.length === 0 ?
                    <div className="alert alert-danger">No Review Yet</div>
                    :
                    reviews && reviews.map(review => (<Review review={review} key={review._id} />))
            }

        </div>
    );
};

export default ListReviews;
