import catchAsync from '../middlewares/catchAsync';
import User from "../models/User";


const register = catchAsync(async (req, res, next) => {
    const {name, email, password} = req.body
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'PUBLIC_ID',
            url: 'PUBLIC_URL'
        }
    });

    res.status(200).json({
        success: true,
        message: 'User created created successfully'
    })
});


export {
    register
}
