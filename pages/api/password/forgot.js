import nc from 'next-connect'
import dbConnect from '../../../config/dbConnect'

import { forgotPassword } from '../../../controllers/authController'

import onError from '../../../middlewares/errors'

const route = nc({ onError });

dbConnect();

route.post(forgotPassword);


export default route;