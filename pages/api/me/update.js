import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'

import {updateProfile} from '../../../controllers/authController'

import {isAuthenticatedUser} from '../../../middlewares/auth'
import onError from '../../../middlewares/errors'

const router = nc({onError});

dbConnect();

router
    .use(isAuthenticatedUser)
    .put(updateProfile);

export default router;