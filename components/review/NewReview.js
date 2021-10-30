
import React, { useState, useEffect } from 'react'

import { toast } from 'react-toastify'
import ButtonLoader from '../layout/ButtonLoader'
import Loader from '../layout/Loader'
import { useDispatch, useSelector } from 'react-redux';
import {clearErrors, createNewReview} from '../../redux/actions/roomActions'
import {NEW_REVIEW_RESET} from "../../redux/constants/roomConstants";
import {useRouter} from "next/router";

const NewReview = () => {

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const router = useRouter()

    const {loading, errors, success} = useSelector(state => state.reviews)

    const {id} = router.query

    useEffect(() => {

        if (errors) {
            toast.error(errors);
            dispatch(clearErrors())
        }

        if(success) {
            toast.success('Review is posted.')
            dispatch({type: NEW_REVIEW_RESET})
        }

    }, [dispatch, errors, success])


    const submitHandler = () => {

        const reviewData = {
            rating, comment
        }

       // console.log(reviewData)
       dispatch(createNewReview(reviewData, id))

    }

    const setUserRatings = () => {
        const stars = document.querySelectorAll('.star')



        stars.forEach((star, index) => {

            star.starValue = index + 1;



            ['click', 'mouseover', 'mouseout'].forEach((e) => {
                    star.addEventListener(e, showRatings)
            })
        })

        function showRatings(e) {

            stars.forEach((star, index) => {

                if(e.type === 'click') {

                    if(index < this.starValue) {

                        //add a class
                        star.classList.add('red')

                        setRating(this.starValue)
                    }
                    else {
                        //remove the class
                        //remove a class
                        star.classList.remove('red')
                    }

                }

                if(e.type === 'mouseover') {

                    if(index < this.starValue) {
                        //add a class
                        star.classList.add('light-red')
                    }
                    else {
                        //remove the class
                        star.classList.remove('light-red')
                    }
                }

                if(e.type === 'mouseout') {
                    star.classList.remove('light-red')
                }

            } )
        }

    }

    return (
        <>
            <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4 mb-5"
                data-toggle="modal"
                data-target="#ratingModal"
                onClick={setUserRatings}
            >
                Submit Your Review
            </button>

            <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ul className="stars">
                                <li className="star"><i className="fa fa-star"/></li>
                                <li className="star"><i className="fa fa-star"/></li>
                                <li className="star"><i className="fa fa-star"/></li>
                                <li className="star"><i className="fa fa-star"/></li>
                                <li className="star"><i className="fa fa-star"/></li>
                            </ul>

                            <textarea
                                name="review"
                                id="review"
                                className="form-control mt-3"
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}/>


                            <button
                                className="btn my-3 float-right review-btn px-4 text-white"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={submitHandler}
                                disabled={!comment || !rating }
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default NewReview;
