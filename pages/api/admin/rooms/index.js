import nc from 'next-connect';

import  {allRoomsAdmin, createRoom} from "../../../../controllers/roomController";
import dbConnect from "../../../../config/dbConnect";
import onError from '../../../../middlewares/errorsController'
import {isAuthenticatedUser, authorizeRoles} from "../../../../middlewares/auth";

const router = nc({onError});

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles('admin')).get(allRoomsAdmin);

router.use(isAuthenticatedUser, authorizeRoles('admin')).post(createRoom);


export default router;