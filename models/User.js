import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Username is Required'],
            maxLength: [50, 'Your name cannot exceed 50 characters']
        },

        email: {
            type: String,
            unique: false,
            required: [true,  'Email field is required'],
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email'],
        },

        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [6, 'Must contain at least 6 characters'],
            select: false
        },
        avatar: {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
        role: {
            type: String,
            default: 'user'
        },

        resetPasswordToken: String,

        resetPasswordExpiredAt: Date

    },
    {
        timestamps: true,
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
    },
);

userSchema.pre('save', async  function (next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next()

});

//Match user password
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
};



//Generate and has password token
userSchema.methods.getResetToken = async function () {
    //Generate Token
    const restToken =  crypto.randomBytes(20).toString('hex');

    //hash token and set to resetPassword token
    this.resetPasswordToken = crypto.createHash('sha256').update(restToken).digest('hex');

    //Set Expire
    this.resetPasswordExpiredAt = Date.now() + 10 * 60 *  1000;
    return restToken;
};


userSchema.methods.getRegistrationToken = async function () {
    //Generate Token
    const registrationToken =  crypto.randomBytes(20).toString('hex');

    //hash token and set to resetPassword token
    this.registrationToken = crypto.createHash('sha256').update(registrationToken).digest('hex');

    //Set Expire
    this.registrationTokenExpiredAt = Date.now() + 10 * 60 *  1000;
    return registrationToken;
};


export default mongoose.models.User || mongoose.model('User', userSchema)