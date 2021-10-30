import nc from 'next-connect';
import  {getRoom, updateRoom, deleteRoom} from "../../../../../controllers/roomController";
import dbConnect from "../../../../../config/dbConnect";
import onError from '../../../../../middlewares/errorsController'

import {authorizeRoles, isAuthenticatedUser} from "../../../../../middlewares/auth";

const router = nc({onError});

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles('admin'))

router.get(getRoom);

router.put(updateRoom);

router.delete(deleteRoom);

export default router;