import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'room name is required'],
            trim: true,
            maxLength: [100, 'Room name cannot exceed 100 characters']
        },

        pricePerNight: {
            type: Number,
            required: [true, 'Price is required'],
            default: 0.0
        },

        description: {
            type: String,
            required: [true, 'Description is required'],
        },

        address: {
            type: String,
            required: [true, 'Address  is required'],
            trim: true,
            maxLength: [150, 'Room cannot exceed 100 characters']
        },

        guestCapacity: {
            type: Number,
            required: [true, 'Capacity is required'],

        },
        numOfBeds: {
            type: Number,
            required: [true, 'Number of beds is required'],
        },

        internet: {
            type: Boolean,
            default: false
        },

        breakfast: {
            type: Boolean,
            default: false
        },
        airConditioned: {
            type: Boolean,
            default: false
        },
        petsAllowed: {
            type: Boolean,
            default: false
        },
        roomCleaning: {
            type: Boolean,
            default: false
        },

        ratings: {
            type: Number,
            default: 0
        },

        numOfReviews: {
            type: Number,
            default: 0
        },

        images: [
            {
                public_id: {
                    type: String,
                    required: true
                },

                url: {
                    type: String,
                    required: true
                }
            }
        ],

        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: {
                values: [
                    'King Size',
                    'King',
                    'Single',
                    'Twins'
                ],
                message: 'Please select category for room'
            }
        },


        reviews: [
            {
                user: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'User',
                    request: true,
                },
                name: {
                    type: String,
                    request: true,
                },

                rating: {
                    type: Number,
                    request: true,
                },
                comment: {
                    type: String,
                    request: true,
                },

            }
        ],
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            request: false,
        }


    },
    {
        timestamps: true,
        toJSON: {virtuals: true},
        toObject: {virtuals: true},
    },
);


export default mongoose.models.Room || mongoose.model('Room', roomSchema)