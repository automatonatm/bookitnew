import axios from 'axios'

import {
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    CLEAR_ERRORS, LOAD_USER_REQUEST, LOAD_USER_SUCCESS
} from "../constants/userConstants";
import absoluteUrl from "next-absolute-url";


//register

export const registerUser = (postData) => async (dispatch) => {

    try {


        dispatch({
            type: REGISTER_USER_REQUEST
        });


        let url = `/api/auth/register`;


        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const {data} = await axios.post(url, postData, config);

        dispatch({
            type: REGISTER_USER_SUCCESS,
        })

    } catch (err) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

export const loadUser = () => async (dispatch) => {

    try {


        dispatch({
            type: LOAD_USER_REQUEST
        });

        let url = `/api/me`;


        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const {data} = await axios.get(url);

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data
        })

    } catch (err) {

        dispatch({
            type: REGISTER_USER_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }

};


//Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
};
