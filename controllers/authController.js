import catchAsync from '../middlewares/catchAsync';
import User from "../models/User";

import cloudinary from 'cloudinary'
import ErrorHandler from "../utils/errorHandler";


// Setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



const register = catchAsync(async (req, res, next) => {

    let result;

        try{
            result = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: 'grynd/avatars',
                width: '150',
                crop: 'scale'
            })

        }catch (err) {
            return next(new ErrorHandler(err.message, 400))
        }


    const {name, email, password} = req.body;


    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    });

    res.status(200).json({
        success: true,
        message: 'User created created successfully'
    })
});

const currentUserProfile = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        data: user
    })

});


export {
    register,
    currentUserProfile
}
