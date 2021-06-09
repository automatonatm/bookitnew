import nc from 'next-connect';
import  {register} from "../../../controllers/authController";
import dbConnect from "../../../config/dbConnect";
import onError from '../../../middlewares/errorsController'



const router = nc({onError});


dbConnect();


router.post(register);



export default router;

