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
    ADMIN_ROOMS_SUCCESS,
    ADMIN_ROOMS_FAIL,
    ADMIN_ROOMS_REQUEST,
    CREAT_ROOM_REQUEST,
    CREAT_ROOM_SUCCESS,
    CREAT_ROOM_FAIL,
    UPDATE_ROOM_REQUEST, UPDATE_ROOM_SUCCESS, UPDATE_ROOM_FAIL
} from "../constants/roomConstants";

import absoluteUrl from 'next-absolute-url'



//get all rooms

export const getRooms = () => async (dispatch) => {
    try {

        dispatch({type: ADMIN_ROOMS_REQUEST})


        //const { origin } = absoluteUrl(req);

        let url = `/api/admin/rooms`


         //url = `${origin}/api/rooms/?page=${currentPage}&location=${location}&guests=${guests}&category=${category}`;


        const {data} = await axios.get(url);

        dispatch({
            type: ADMIN_ROOMS_SUCCESS,
            payload: data
        })



    } catch (err) {
        dispatch({
            type: ADMIN_ROOMS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const createRoom = (postData) => async (dispatch) => {
    try {

        dispatch({type: CREAT_ROOM_REQUEST})


        //const { origin } = absoluteUrl(req);

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };


        let url = `/api/admin/rooms`


        //url = `${origin}/api/rooms/?page=${currentPage}&location=${location}&guests=${guests}&category=${category}`;


        const {data} = await axios.post(url, postData, config);


        dispatch({
            type: CREAT_ROOM_SUCCESS,
            payload: data
        })



    } catch (err) {
        dispatch({
            type: CREAT_ROOM_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}



export const updateRoom = (postData, roomId) => async (dispatch) => {
    try {

        dispatch({type: UPDATE_ROOM_REQUEST})


        //const { origin } = absoluteUrl(req);

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };



        let url = `/api/admin/rooms/${roomId}`



        const {data} = await axios.put(url, postData, config);


        dispatch({
            type: UPDATE_ROOM_SUCCESS,
            payload: data
        })


    } catch (err) {
        dispatch({
            type: UPDATE_ROOM_FAIL,
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

