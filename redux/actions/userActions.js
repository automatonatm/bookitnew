import axios from 'axios'

import {
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    CLEAR_ERRORS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, LOAD_USER_FAIL
} from "../constants/userConstants";



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

// Update Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put('/api/me/update', userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (err) {

        dispatch({
            type: UPDATE_PROFILE_FAIL,
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

        const {data} = await axios.get(url);

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data
        })

    } catch (err) {

        dispatch({
            type: LOAD_USER_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }

};


// Forgot Password action
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.post('/api/password/forgot', email, config)

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })

    } catch (err) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
};

// Reset Password action
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {

        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/password/reset/${token}`, passwords, config);

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (err) {

        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}


//Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
};
