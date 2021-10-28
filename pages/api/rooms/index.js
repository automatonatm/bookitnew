import nc from 'next-connect';

import  {allRooms, createRoom} from "../../../controllers/roomController";
import dbConnect from "../../../config/dbConnect";
import onError from '../../../middlewares/errorsController'

const router = nc({onError});

dbConnect();

router.get(allRooms);

router.post(createRoom);


export default router;