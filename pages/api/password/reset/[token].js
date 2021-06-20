import nc from 'next-connect'

import dbConnect from '../../../../config/dbConnect'

import { resetPassword } from '../../../../controllers/authController'

import onError from '../../../../middlewares/errors'

const router = nc({ onError });

dbConnect();

router.put(resetPassword)

export default router;