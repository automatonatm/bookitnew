//All Rooms Reducer


import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL
} from "../constants/userConstants";


//Auth Reducer
export const authReducer = (state = {user: null}, action) => {

    switch (action.type) {
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



//Load user
export const loadUserReducer = (state = {user: null, loading: true}, action) => {

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

        case CLEAR_ERRORS:
            return {
                errors: null
            };

        default:
            return state;
    }
};


// User reducer
export const userReducer = (state = {}, action) => {
    switch (action.type) {

        case UPDATE_PROFILE_REQUEST:
            return {
                loading: true
            };


        case UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload,
            }


        case UPDATE_PROFILE_RESET:
            return {
                loading: false,
                isUpdated: false,
            }


        case UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                errors: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            }

        default:
            return state
    }
}


//Forgot Password
export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
       case RESET_PASSWORD_REQUEST:
            return {
                loading: true
            }

        case FORGOT_PASSWORD_SUCCESS:
            return {
                loading: false,
                message: action.payload,
            }

        case RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            }

        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                loading: false,
                errors: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            }

        default:
            return state
    }
}





