import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'

import { myBookings } from '../../../controllers/bookingController'

import { isAuthenticatedUser } from '../../../middlewares/auth'

import onError from '../../../middlewares/errors'

const router = nc({ onError });

dbConnect();

router.use(isAuthenticatedUser).get(myBookings);

export default router;