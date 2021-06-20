import axios from 'axios'

import {
    ALL_ROOMS_FAIL,
    ALL_ROOMS_SUCCESS,
    CLEAR_ERRORS,
    ROOM_DETAILS_FAIL,
    ROOM_DETAILS_SUCCESS
} from "../constants/roomConstants";

import absoluteUrl from 'next-absolute-url'



//get all rooms

export const getRooms = (req, currentPage = 1, location='', guests='', category='') => async (dispatch) => {
    try {

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

    try {

        const { origin } = absoluteUrl(req);

        const {data} = await axios.get(`${origin}/api/rooms/${id}`);

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


//Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

