import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'

import { stripeCheckoutSession } from '../../../controllers/paymentControllers'

import { isAuthenticatedUser } from '../../../middlewares/auth'

import onError from '../../../middlewares/errors'

const router = nc({ onError });

dbConnect();

router.use(isAuthenticatedUser).get(stripeCheckoutSession);

export default router;

