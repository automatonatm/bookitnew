import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'

import { checkRoomBookingAvailability } from '../../../controllers/bookingController'

import { isAuthenticatedUser } from '../../../middlewares/auth'

import onError from '../../../middlewares/errors'

const router = nc({ onError });

dbConnect();

router.get(checkRoomBookingAvailability)

export default router;