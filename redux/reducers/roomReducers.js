
//All Rooms Reducer
import {
    ALL_ROOMS_FAIL,
    ALL_ROOMS_SUCCESS,
    CLEAR_ERRORS,
    ROOM_DETAILS_FAIL,
    ROOM_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET
} from "../constants/roomConstants";


//get all rooms
const allRoomsReducer = (state={rooms: []}, action) => {
    switch (action.type) {
        case ALL_ROOMS_SUCCESS:
            return  {
                count: action.payload.count,
                resPerPage: action.payload.resPerPage,
                filteredRoomsCount: action.payload.filteredRoomsCount,
                rooms: action.payload.data
            };

        case ALL_ROOMS_FAIL:
            return  {
                errors: action.payload
            };

        case CLEAR_ERRORS:
            return {
                errors: null
            };

        default: return state;
    }
};



//room details
const roomDetailsReducer = (state={room: {}}, action) => {
    switch (action.type) {
        case ROOM_DETAILS_SUCCESS:
            return  {
                room: action.payload.data
            };

        case ROOM_DETAILS_FAIL:
            return  {
                errors: action.payload
            };

        case CLEAR_ERRORS:
            return {
                errors: null
            };

        default: return state;
    }
};


//room details
const roomReviewReducer = (state={}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return  {
                loading: true
            };
        case NEW_REVIEW_SUCCESS:
            return  {
                loading: false,
                success: action.payload
            };
        case NEW_REVIEW_FAIL:
            return  {
                loading: false,
                errors: action.payload
            };

        case NEW_REVIEW_RESET:
            return  {
                success: false
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
    allRoomsReducer,
    roomDetailsReducer,
    roomReviewReducer
}