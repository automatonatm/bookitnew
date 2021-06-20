//All Rooms Reducer


import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL
} from "../constants/userConstants";


//Auth Reducer
export const authReducer = (state = {user: null}, action) => {

    switch (action.type) {

        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }

        case LOAD_USER_SUCCESS:
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.data
            }

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                errors: action.payload
            };


        case REGISTER_USER_REQUEST:
            return {
                loading: true
            };


        case REGISTER_USER_SUCCESS:
            return {
                loading: false,
                success: true
            };

        case REGISTER_USER_FAIL:
            return {
                loading: false,
                errors: action.payload
            };

        case CLEAR_ERRORS:
            return {
                errors: null
            };

        default:
            return state;
    }
};







