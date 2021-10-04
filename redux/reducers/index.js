import {combineReducers} from 'redux'


import {allRoomsReducer, roomDetailsReducer, roomReviewReducer} from "./roomReducers";
import {checkBookingReducer, bookedDatesReducer, bookingsReducer, bookingReducer} from "./bookingReducers";


import {authReducer, userReducer, forgotPasswordReducer, loadUserReducer,} from "./userReducers";


const reducer = combineReducers({
    rooms: allRoomsReducer,
    room: roomDetailsReducer,
    auth: authReducer,
    loadedUser: loadUserReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    checkBooking: checkBookingReducer,
    bookedDates: bookedDatesReducer,
    bookings: bookingsReducer,
    booking: bookingReducer,
    reviews: roomReviewReducer,
});

export default reducer