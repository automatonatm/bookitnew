import axios from 'axios'

import {
    ALL_ROOMS_FAIL,
    ALL_ROOMS_SUCCESS,
    CLEAR_ERRORS,
    ROOM_DETAILS_FAIL,
    ROOM_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    REVIEW_AVAILABILITY_REQUEST,
    REVIEW_AVAILABILITY_SUCCESS,
    REVIEW_AVAILABILITY_FAIL,
    ROOM_DETAILS_REQUEST
} from "../constants/roomConstants";

import absoluteUrl from 'next-absolute-url'



//get all rooms

export const getRooms = (req, currentPage = 1, location='', guests='', category='') => async (dispatch) => {
    try {

        //done for server side rendering

        const { origin } = absoluteUrl(req);

        let url = `${origin}/api/rooms/?page=${currentPage}&location=${location}`

        if(guests) url = url.concat(`&guestCapacity=${guests}`);

        if(category) url = url.concat(`&category=${category}`);

         //url = `${origin}/api/rooms/?page=${currentPage}&location=${location}&guests=${guests}&category=${category}`;

        console.log(url)


        const {data} = await axios.get(url);


        dispatch({
            type: ALL_ROOMS_SUCCESS,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: ALL_ROOMS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}


//get room
export const getRoomDetails = (req, id) => async (dispatch) => {

    dispatch({type: ROOM_DETAILS_REQUEST})


    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        let url = `/api/rooms/${id}`


        if(req !== '') {
            const { origin } = absoluteUrl(req);
            url = `${origin}/api/rooms/${id}`
        }




        const {data} = await axios.get(url);



        dispatch({
            type: ROOM_DETAILS_SUCCESS,
            payload: data
        })

    } catch (err) {
        dispatch({
            type: ROOM_DETAILS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

//create a review
export const createNewReview = (postData, roomId) => async (dispatch) => {

    try {

        dispatch({type: NEW_REVIEW_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const {data} = await axios.put(`/api/rooms/${roomId}/reviews`, postData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (err) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}



export const checkReviewAvailability = (roomId) => async (dispatch) => {

    try {

        dispatch({type: REVIEW_AVAILABILITY_REQUEST})


        const {data} = await axios.get(`/api/reviews/check-review-availability?roomId=${roomId}`);

        dispatch({
            type: REVIEW_AVAILABILITY_SUCCESS,
            payload: data.canReview
        })

    } catch (err) {
        dispatch({
            type: REVIEW_AVAILABILITY_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}



//Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

