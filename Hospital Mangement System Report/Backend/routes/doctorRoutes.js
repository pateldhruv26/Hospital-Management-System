import {Router} from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {getDoctorInfoController, updateProfileController, getDoctorByIdController,doctorAppointmentsController,updateStatusController} from  '../controllers/doctorCtrl.js'

const doctorRouter = Router();

//POST || Single Doc Info
doctorRouter.post('/getDoctorInfo',authMiddleware,getDoctorInfoController);

//POST UPDATE PROFILE
doctorRouter.post("/updateProfile", authMiddleware, updateProfileController);

//POST  GET SINGLE DOC INFO
doctorRouter.post("/getDoctorById", getDoctorByIdController);

//GET Appointments
doctorRouter.get(
  "/doctor-appointments",
  authMiddleware,
  doctorAppointmentsController
);

//POST Update Status
doctorRouter.post("/update-status", updateStatusController);

export default doctorRouter;