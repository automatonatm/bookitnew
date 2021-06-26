import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'

import { newBooking } from '../../../controllers/bookingController'

import { isAuthenticatedUser } from '../../../middlewares/auth'

import onError from '../../../middlewares/errors'

const router = nc({ onError });

dbConnect();

router
    .use(isAuthenticatedUser)
    .post(newBooking)

export default router;