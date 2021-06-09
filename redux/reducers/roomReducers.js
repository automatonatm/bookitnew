
//All Rooms Reducer


import {ALL_ROOMS_FAIL, ALL_ROOMS_SUCCESS, CLEAR_ERRORS} from "../constants/roomConstants";

const initialState = {
    rooms: []
};

const allRoomsReducer = (state=initialState, action) => {
    switch (action.type) {
        case ALL_ROOMS_SUCCESS:
            return  {
                count: action.payload.count,
                resPerPage: action.payload.resPerPage,
                filteredRoomsCount: action.payload.filteredRoomsCount,
                rooms: action.payload.data.data
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


export  {
    allRoomsReducer
}