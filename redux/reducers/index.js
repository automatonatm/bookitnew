import {combineReducers} from  'redux'


import {allRoomsReducer, roomDetailsReducer} from "./roomReducers";


import {authReducer} from "./userReducers";


const reducer = combineReducers({
    rooms: allRoomsReducer,
    room: roomDetailsReducer,
    auth: authReducer
});

export default reducer