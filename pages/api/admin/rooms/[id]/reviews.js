import nc from 'next-connect';
import  {createRoomReview} from "../../../../controllers/roomController";
import dbConnect from "../../../../config/dbConnect";
import onError from '../../../../middlewares/errorsController'

import  {isAuthenticatedUser} from "../../../../middlewares/auth";

const router = nc({onError});

dbConnect();

router.use(isAuthenticatedUser).put(createRoomReview);


export default router;