
//All Rooms Reducer
import {
    ADMIN_ROOMS_FAIL,
    ADMIN_ROOMS_REQUEST,
    ADMIN_ROOMS_SUCCESS,
    CLEAR_ERRORS,
    CREAT_ROOM_FAIL,
    CREAT_ROOM_REQUEST, CREAT_ROOM_RESET,
    CREAT_ROOM_SUCCESS, UPDATE_ROOM_FAIL, UPDATE_ROOM_REQUEST, UPDATE_ROOM_RESET, UPDATE_ROOM_SUCCESS
} from "../constants/roomConstants";



//get all rooms
const adminRoomsReducer = (state= {rooms: []}, action) => {
    switch (action.type) {

        case CREAT_ROOM_REQUEST:
            return {
                loading: true
            }

        case CREAT_ROOM_SUCCESS:

            return {
                loading: false,
                success: action.payload.success,
                room: action.payload.data
            }


        case CREAT_ROOM_FAIL:
            return  {
                errors: action.payload,
                loading: false
            };

        case CREAT_ROOM_RESET:
            return {
                success: false
            }

        case UPDATE_ROOM_REQUEST:
            return {
                loading: true
            }

        case UPDATE_ROOM_SUCCESS:

            return {
                loading: false,
                success: action.payload.success,
                room: action.payload.data
            }


        case UPDATE_ROOM_FAIL:
            return  {
                errors: action.payload,
                loading: false
            };

        case UPDATE_ROOM_RESET:
            return {
                success: false
            }


        case ADMIN_ROOMS_REQUEST:
            return {
                loading: true
            }

        case ADMIN_ROOMS_SUCCESS:
            return  {
                count: action.payload.count,
                resPerPage: action.payload.resPerPage,
                filteredRoomsCount: action.payload.filteredRoomsCount,
                rooms: action.payload.data,
                loading: false
            };

        case ADMIN_ROOMS_FAIL:
            return  {
                errors: action.payload,
                loading: false
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            };

        default: return state;
    }
};



export  {
    adminRoomsReducer,
}