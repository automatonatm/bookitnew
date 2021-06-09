import nc from 'next-connect';
import  {getRoom, updateRoom, deleteRoom} from "../../../../controllers/roomController";
import dbConnect from "../../../../config/dbConnect";
import onError from '../../../../middlewares/errorsController'

const router = nc({onError});

dbConnect();

router.get(getRoom);

router.put(updateRoom);

router.delete(deleteRoom);


export default router;