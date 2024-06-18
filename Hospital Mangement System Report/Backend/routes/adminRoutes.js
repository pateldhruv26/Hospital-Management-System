import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getAllUsersController, getAllDoctorController, changeAccountStatusController} from  '../controllers/adminCtrl.js'

const adminRouter = Router();

//GET || USERS
adminRouter.get('/getAllUsers', authMiddleware, getAllUsersController)

//GET || Doctors
adminRouter.get('/getAllDoctors', authMiddleware, getAllDoctorController)

//POST || Account Status
adminRouter.post('/changeAccountStatus',authMiddleware, changeAccountStatusController)

export default adminRouter;