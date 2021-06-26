import catchAsync from '../middlewares/catchAsync';
import Room from "../models/Room";
import Booking from "../models/Booking";
import  ErrorHandler from '../utils/errorHandler'
import  APIFeatures from '../utils/apiFeatures'

import  moment from 'moment';
import  {extendMoment} from 'moment-range';
moment().format();

const momentExt = extendMoment(moment)

const newBooking = catchAsync(async (req, res, next) => {

    const {
        room,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
    } = req.body;

    if(!room || !checkOutDate || !checkOutDate || !daysOfStay || !amountPaid || !paymentInfo) {
        return next(new ErrorHandler('Please fill all form fields', 400))
    }

    const booking = await Booking.create({
        room,
        user: req.user.id,
        checkInDate: moment(checkInDate),
        checkOutDate: moment(checkOutDate),
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now()
    });


    res.status(200).json({
        success: true,
        data: booking
    })
});


// Create new booking   =>   /api/bookings/check
const checkRoomBookingAvailability = catchAsync(async (req, res) => {

    let { roomId, checkInDate, checkOutDate } = req.query;

    checkInDate = moment(checkInDate);
    checkOutDate = moment(checkOutDate);

    const bookings = await Booking.find({
        room: roomId,
        $and: [{checkInDate: {$lte: checkOutDate}}, {checkOutDate: {$gte: checkInDate}}]
    });

    // Check if there is any booking available
    let isAvailable;

    isAvailable = bookings && bookings.length === 0;


    res.status(200).json({
        success: true,
        data: isAvailable
    })

})


// Check booked dates of a room   =>   /api/bookings/check_booked_dates
const checkBookedDatesOfRoom = catchAsync(async (req, res) => {

    const { roomId } = req.query;

    const bookings = await Booking.find({ room: roomId });

    let bookedDates = [];

    const timeDiffernece = moment().utcOffset() / 60;



    bookings.forEach(booking => {

        const checkInDate = moment(booking.checkInDate).add(timeDiffernece, 'hours')
        const checkOutDate = moment(booking.checkOutDate).add(timeDiffernece, 'hours')

        const range = moment.range(moment(checkInDate), moment(checkOutDate));

        const dates = Array.from(range.by('day'));

        bookedDates = bookedDates.concat(dates);
    });


    res.status(200).json({
        success: true,
        data: bookedDates
    })
})

// Get all bookings of current user   =>   /api/bookings/me
const myBookings = catchAsync(async (req, res) => {

    const bookings = await Booking.find({ user: req.user.id })
        .populate({
            path: 'room',
            select: 'name pricePerNight images'
        })
        .populate({
            path: 'user',
            select: 'name email'
        })

    res.status(200).json({
        success: true,
        count:bookings.length,
        data: bookings
    })
});


// Get booking details   =>   /api/bookings/:id
const getBookingDetails = catchAsync(async (req, res) => {

    const booking = await Booking.findById(req.query.id)
        .populate({
            path: 'room',
            select: 'name pricePerNight images'
        })
        .populate({
            path: 'user',
            select: 'name email'
        })

    res.status(200).json({
        success: true,
        data: booking
    })
})


export  {
 newBooking, checkRoomBookingAvailability, checkBookedDatesOfRoom, myBookings, getBookingDetails
}