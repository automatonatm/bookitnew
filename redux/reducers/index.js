import {combineReducers} from  'redux'


import {allRoomsReducer, roomDetailsReducer} from "./roomReducers";


import {authReducer, userReducer, forgotPasswordReducer} from "./userReducers";


const reducer = combineReducers({
    rooms: allRoomsReducer,
    room: roomDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer
});

export default reducer