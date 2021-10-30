import catchAsync from '../middlewares/catchAsync';
import Room from "../models/Room";
import  ErrorHandler from '../utils/errorHandler'
import  APIFeatures from '../utils/apiFeatures'
import Booking from "../models/Booking";
import cloudinary from 'cloudinary'

// Setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const allRooms = catchAsync(async (req, res, next) => {

    const resPerPage = 4;
    const roomCount =  await Room.countDocuments();

    const apiFeatures = new APIFeatures(Room.find().sort( { createdAt: -1 } ), req.query)
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


const allRoomsAdmin = catchAsync(async (req, res, next) => {

    const resPerPage = 4;
    const roomCount =  await Room.countDocuments();

    const apiFeatures = new APIFeatures(Room.find().sort( { createdAt: -1 } ), req.query)
        .search()
        .filter();


    let rooms = await apiFeatures.query;
    let filteredRoomsCount = rooms.length;

    apiFeatures.pagination();

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





const createRoom = catchAsync(async (req, res, next) => {

    const {images} = req.body

    let imagesLink = []

    if(images.length > 0) {
        for (let i=0; i < images.length; i++) {
            let result;
            try{
                result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: 'bookit/rooms',
                    width: '300',
                    crop: 'scale'
                })

                imagesLink.push({
                    public_id: result.public_id,
                    url: result.secure_url
                })

            }catch (err) {
                return next(new ErrorHandler(err.message, 400))
            }
        }
    }

    req.body.images = imagesLink

    req.body.user = req.user.id

    const  room = await Room.create(req.body);



    res.status(200).json({
        success: true,
        data: room
    })
});


const updateRoom = catchAsync(async (req, res, next) => {


    const room = await Room.findById(req.query.id);

    if(!room) {
        return next(new ErrorHandler('Room not found', 404))
    }


    if (req.body.images) {

        // Delete images associated with the room
        for (let i = 0; i < room.images.length; i++) {
            await cloudinary.v2.uploader.destroy(room.images[i].public_id)
        }

        let imagesLinks = []
        const images = req.body.images;

        for (let i = 0; i < images.length; i++) {

            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'bookit/rooms',
                width: '200',
                crop: 'scale'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })

        }

        req.body.images = imagesLinks;

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
        r => r.user.toString() === req.user.id.toString()
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


    await room.save({validateBeforeSave: false})



    res.status(200).json({
        success: true,
    })
});



const  checkIfUserCanReview = catchAsync(async (req, res) => {

    const {roomId} = req.query

    const bookings = await Booking.find({user: req.user.id, room: roomId})

    let canReview = false;


    if(bookings.length > 0)  canReview = true

    res.status(200).json({
        status: true,
        canReview
    })

})


export  {
    allRooms,
    getRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    createRoomReview,
    checkIfUserCanReview,
    allRoomsAdmin
}