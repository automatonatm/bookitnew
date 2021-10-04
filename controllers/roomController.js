import catchAsync from '../middlewares/catchAsync';
import Room from "../models/Room";
import  ErrorHandler from '../utils/errorHandler'
import  APIFeatures from '../utils/apiFeatures'
import contains from "validator/es/lib/contains";


const allRooms = catchAsync(async (req, res, next) => {

    const resPerPage = 4;
    const roomCount =  await Room.countDocuments();

    const apiFeatures = new APIFeatures(Room.find(), req.query)
        .search()
        .filter();



   let rooms = await apiFeatures.query;
   let filteredRoomsCount = rooms.length;

   apiFeatures.pagination(resPerPage);

   rooms = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: roomCount,
        resPerPage,
        filteredRoomsCount,
        data: rooms
    })
});


const getRoom = catchAsync(async (req, res, next) => {


    const room = await Room.findById(req.query.id);

    if(!room) {
        return  next(new ErrorHandler('Not Found', 404))
    }

    res.status(200).json({
        success: true,
        data: room
    })
});



const deleteRoom = catchAsync(async (req, res, next) => {

    const room = await Room.findById(req.query.id);

    if(!room) {
        return next(new ErrorHandler('Room not found', 404))
    }

    await room.remove();

    res.status(204).json({
        success: true,
    })
});


const updateRoom = catchAsync(async (req, res, next) => {


    const room = await Room.findById(req.query.id);

    if(!room) {
        return next(new ErrorHandler('Room not found', 404))
    }

    const updatedRoom = await Room.findByIdAndUpdate(req.query.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });



    res.status(200).json({
        success: true,
        data: updatedRoom
    })
});


const createRoom = catchAsync(async (req, res, next) => {

    const  room = await Room.create(req.body);

    res.status(200).json({
        success: true,
        data: room
    })
});


const createRoomReview = catchAsync(async (req, res, next) => {

    const {rating, comment, roomId} = req.body

    const room = await Room.findById(req.query.id);

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    if(!room) {
        return next(new ErrorHandler('Room not found', 404))
    }

    const isReviewed = room.reviews.find(
        r => r.user.toString() === req.user.toString()
    )

    if(isReviewed) {
        room.reviews.forEach(review => {
            if(review.user.toString() === req.user.id.toString()) {
                review.comment = comment
                review.rating = rating
            }
        })

    }else  {
        room.reviews.push(review)
        room.numOfReviews = room.reviews.length
    }


    room.ratings = room.reviews.reduce((acc, item) => item.rating + acc, 0) / room.reviews.length

    await review.save({validateBeforeSave: false})



    res.status(204).json({
        success: true,
    })
});


export  {
    allRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    createRoomReview
}