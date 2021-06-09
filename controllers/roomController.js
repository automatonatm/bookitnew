import catchAsync from '../middlewares/catchAsync';
import Room from "../models/Room";
import  ErrorHandler from '../utils/errorHandler'
import  APIFeatures from '../utils/apiFeatures'


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


export  {
    allRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom
}